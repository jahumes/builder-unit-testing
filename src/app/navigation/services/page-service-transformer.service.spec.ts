import {TestBed, inject} from '@angular/core/testing';
import {PageServiceTransformerService, STATE} from './page-service-transformer.service';
import {DefaultUrlSerializer, RouterModule, RouterStateSnapshot, UrlSerializer} from "@angular/router";
import { AngularjsPageServiceMock } from '../test-helpers/mocks/angularjs-page-service.mock';
import { AngularjsPageBuilder } from '../test-helpers/builders/angularjs-page.builder';
import { ActivatedRouteBuilder } from '../../../test-helpers/@angular';

describe('PageServiceTransformerService', () => {
    let stateMock: any, stateSnapshotMock: RouterStateSnapshot, paramMap: { [key: string]: string };
    beforeEach(() => {
        stateMock = {href: jest.fn()};
        stateMock.href.mockImplementation((state: string) => {
            return '/' + state.split('.').join('/');
        });
        stateSnapshotMock = {
            root: ActivatedRouteBuilder.init().withParams({}).snapshot,
            url: ''
        };
        TestBed.configureTestingModule({
            imports: [RouterModule],
            providers: [
                PageServiceTransformerService,
                {provide: STATE, useValue: stateMock},
                {provide: UrlSerializer, useClass: DefaultUrlSerializer}
            ]
        });
    });

    it('should be created', inject([PageServiceTransformerService], (service: PageServiceTransformerService) => {
        expect(service).toBeTruthy();
    }));

    describe('transforming the parent', () => {
        let transformer: PageServiceTransformerService, pageService: AngularjsPageServiceMock;
        beforeEach(inject([PageServiceTransformerService], (service: PageServiceTransformerService) => {
            transformer = service;
            pageService = AngularjsPageServiceMock.init();
        }));

        it('should use the state over the url', () => {
            pageService.withParentState('testing.state.url.1').withParentUrl('some/url.jsp');

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });

        it('should use either the state or the url if they are set and the other returns undefined', () => {
            pageService.withParentState(undefined).withParentUrl('some/url.jsp');
            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();

            pageService.withParentState('testing.state.url.1').withParentUrl(undefined);
            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });
    });

    describe('transforming the pages', () => {
        let transformer: PageServiceTransformerService, pageService: AngularjsPageServiceMock;
        beforeEach(inject([PageServiceTransformerService], (service: PageServiceTransformerService) => {
            transformer = service;
            pageService = AngularjsPageServiceMock.init().withParentState('testing.state.parent');
        }));

        it('should be able to transform simple pages', () => {
            pageService
                .withPage(AngularjsPageBuilder.init().withState('testing.state.1'))
                .withPage(AngularjsPageBuilder.init().withState('testing.state.2'))
                .withPage(AngularjsPageBuilder.init().withState('testing.state.3'));

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });

        it('should use the link property on an AngularJSPage as the link', () => {
            pageService
                .withPage(
                    AngularjsPageBuilder.init()
                        .withState('testing.state.1')
                        .withLink(['admin', 'testing', 12])
                )
                .withPage(AngularjsPageBuilder.init().withState('testing.state.2'));

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });

        it('should parse query params from a passed url', () => {
            stateMock.href.mockImplementation((state: string) => {
                return '/' + state.split('.').join('/') + '?testing=new&another=test';
            });

            pageService
                .withPage(
                    AngularjsPageBuilder.init()
                        .withState('testing.state.1')
                        .withLink(['admin', 'testing', 12])
                )
                .withPage(AngularjsPageBuilder.init().withState('testing.state.2'));

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });

        it('should parse child pages if set', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withState('testing.state.1')
                    .withLink(['admin', 'testing', 12])
            )
                .withPage(
                    AngularjsPageBuilder.init()
                        .withState('testing.state.2')
                        .withPage(AngularjsPageBuilder.init().withState('testing.state.2.1'))
                        .withPage(AngularjsPageBuilder.init().withState('testing.state.2.2'))
                        .withPage(AngularjsPageBuilder.init().withState('testing.state.2.3'))
                );

            let navigation = transformer.transform(pageService, stateSnapshotMock);

            expect(navigation).toMatchSnapshot();
            expect(navigation.items[1].children.length).toEqual(3);
            expect(navigation.items[1].children).toEqual(expect.arrayContaining([
                expect.objectContaining({link: ['/testing/state/2/1']}),
                expect.objectContaining({link: ['/testing/state/2/2']}),
                expect.objectContaining({link: ['/testing/state/2/3']})
            ]));
        });

        it('should get a link from the first child if no state is set on the parent', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withState(null)
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2.1'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2.2'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2.3'))
            );

            let navigation = transformer.transform(pageService, stateSnapshotMock);

            expect(navigation).toMatchSnapshot();
            expect(navigation.items[0].link[0]).toEqual('/testing/state/2/1');
        });

        it('should output an empty string if the page has no valid state', () => {
            pageService
                .withPage(AngularjsPageBuilder.init().withState(null))
                .withPage(AngularjsPageBuilder.init());

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });
    });

    describe('transform pages with params', () => {
        let transformer: PageServiceTransformerService, pageService: AngularjsPageServiceMock;
        beforeEach(inject([PageServiceTransformerService], (service: PageServiceTransformerService) => {
            transformer = service;
            pageService = AngularjsPageServiceMock.init();
        }));

        it('should pass params as state options for an AngularJS page', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.1'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.3'))
            );

            stateSnapshotMock = {
                url: '',
                root: ActivatedRouteBuilder.init()
                        .withFirstChild(ActivatedRouteBuilder.init().withParams({some: 'param'})).snapshot
            };

            let navigation = transformer.transform(pageService, stateSnapshotMock);

            expect(navigation).toMatchSnapshot();
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.1', {some: 'param'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.2', {some: 'param'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.3', {some: 'param'});
        });
        it('should parse an Angular link with the params', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withPage(AngularjsPageBuilder.init().withLink(['testing/:id/new/:path']))
                    .withPage(AngularjsPageBuilder.init().withLink(['testing/:path/new/:id']))
            );

            stateSnapshotMock = {
                url: '',
                root: ActivatedRouteBuilder.init()
                    .withFirstChild(ActivatedRouteBuilder.init().withParams({id: 'object', path: 'other'})).snapshot
            };

            expect(transformer.transform(pageService, stateSnapshotMock)).toMatchSnapshot();
        });
        it('should map the param keys if paramMapping data is passed in', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withPage(AngularjsPageBuilder.init().withLink(['testing/:other/new/:changed']))
                    .withPage(AngularjsPageBuilder.init().withLink(['testing/:changed/new/:other']))
            );

            stateSnapshotMock = {
                url: '',
                root: ActivatedRouteBuilder.init()
                    .withFirstChild(ActivatedRouteBuilder.init().withParams({id: 'object', path: 'other'})).snapshot
            };

            expect(transformer.transform(pageService, stateSnapshotMock, {id: 'other', path: 'changed'})).toMatchSnapshot();
        });
        it('should get all paramters from the tree overriding values with the same key', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.1'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.3'))
            );

            stateSnapshotMock = {
                url: '',
                root: ActivatedRouteBuilder.init()
                    .withParams({new: 'item'})
                    .withFirstChild(
                        ActivatedRouteBuilder.init()
                            .withParams({some: 'param'})
                            .withFirstChild(ActivatedRouteBuilder.init().withParams({another: 'changed'}))
                    ).snapshot
            };

            let navigation = transformer.transform(pageService, stateSnapshotMock);

            expect(navigation).toMatchSnapshot();
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.1', {new: 'item', some: 'param', another: 'changed'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.2', {new: 'item', some: 'param', another: 'changed'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.3', {new: 'item', some: 'param', another: 'changed'});
        });
        it('should remap parameter values to new values if they exist', () => {
            pageService.withPage(
                AngularjsPageBuilder.init()
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.1'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.2'))
                    .withPage(AngularjsPageBuilder.init().withState('testing.state.3'))
            );

            stateSnapshotMock = {
                url: '',
                root: ActivatedRouteBuilder.init()
                    .withFirstChild(
                        ActivatedRouteBuilder.init()
                            .withParams({some: 'param'})
                    ).snapshot
            };

            let navigation = transformer.transform(pageService, stateSnapshotMock, {some: 'newItem'});

            expect(navigation).toMatchSnapshot();
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.1', {some: 'param', newItem: 'param'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.2', {some: 'param', newItem: 'param'});
            expect(stateMock.href).toHaveBeenCalledWith('testing.state.3', {some: 'param', newItem: 'param'});
        });
    });
});
