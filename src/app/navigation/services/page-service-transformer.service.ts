import {Inject, Injectable} from '@angular/core';
import {isFunction, isUndefined} from "lodash";
import {
    Params,
    PRIMARY_OUTLET,
    RouterStateSnapshot,
    UrlSerializer
} from "@angular/router";
import { AngularJSPageService, AngularJSPage } from '../interfaces/angularjs-page.interface';
import { NavItem, Navigation } from '../interfaces/navigation.interface';

export const STATE = () => {};

// import {URLParse} from "url-parse";

interface PageServiceWithParams {
    service: AngularJSPageService;
    params: Params;
}

@Injectable({
    providedIn: 'root'
})
export class PageServiceTransformerService {

    constructor(
        @Inject(STATE) private $state: any,
        private urlSerializer: UrlSerializer,
    ) {
    }

    transform(service: AngularJSPageService, state: RouterStateSnapshot, paramMap: { [key: string]: string } = {}): Navigation {
        let params: Params = this._getParams(state, paramMap);

        let pageService = {service, params};

        return {
            parent: this._getParent(pageService),
            items: this._getItems(pageService)
        };
    }

    private _getParams(state: RouterStateSnapshot, paramMap: { [key: string]: string }): Params {
        let params: Params = {};
        let route = state.root;
        do {
            params = {...params, ...route.params};
            route = route.firstChild;
        } while (route);

        if (paramMap) {
            for (let key in paramMap) {
                if (paramMap.hasOwnProperty(key) && params[key]) {
                    params[paramMap[key]] = params[key];
                }
            }
        }

        return params;
    }

    private _getParent(pageService: PageServiceWithParams): NavItem {
        let page: AngularJSPage = {
            label: pageService.service.getLabel()
        };

        if (pageService.service.getParentState && pageService.service.getParentUrl) {
            let state = pageService.service.getParentState();
            let url = pageService.service.getParentUrl();
            if (state) {
                page.state = state;
            } else if (url) {
                page.url = url;
            }
        } else if (pageService.service.getParentState) {
            page.state = pageService.service.getParentState();
        } else if (pageService.service.getParentUrl) {
            page.url = pageService.service.getParentUrl();
        }

        return this._transformPageToNavItem(page, pageService.params);
    }

    private _getItems(pageService: PageServiceWithParams): NavItem[] {
        let items: NavItem[] = [];
        let pages = pageService.service.getPages();

        for (let page of pages) {
            items.push(this._transformPageToNavItem(page, pageService.params));
        }

        return items;
    }

    private _transformPageToNavItem(page: AngularJSPage, params: Params): NavItem {
        let link = this._getLinkFromPage(page, params);
        let query = {};
        if (!Array.isArray(link)) {
            let {path, queryParams} = this._parseUrlForPieces(link);
            link = [path];
            query = queryParams;
        }

        let navItem: NavItem = {
            link: link,
            queryParams: query,
            label: page.label
        };

        if (page.pages && page.pages.length > 0) {
            navItem.children = page.pages.map(subPage => this._transformPageToNavItem(subPage, params));
        }

        return navItem;
    }

    private _parseUrlForPieces(url: string) {
        let parsedUrl = this.urlSerializer.parse(url);

        return {
            path: '/' + parsedUrl.root.children[PRIMARY_OUTLET].toString(),
            queryParams: parsedUrl.queryParams
        };
    }

    private _parseLinkForParams(link: any[], params: Params) {
        let parts = link.reduce((agg, value) => {
            if (typeof value !== 'string') {
                return [...agg, value];
            }
            return [...agg, ...value.split('/')];
        }, []).map((part: any) => {
            if (typeof part !== 'string' || !part.startsWith(':')) {
                return part;
            }

            return params[part.substr(1)] ? params[part.substr(1)] : null;
        }).filter((part: any) => part !== null);

        return parts;
    }

    private _getLinkFromPage(page: AngularJSPage, params: Params): string[] | string {
        // Return the Angular link if it exists
        if (page.link) {
            return this._parseLinkForParams(page.link, params);
        }

        // If there is a redirect set, return it as is
        if (page.redirect) {
            return isFunction(page.redirect) ? page.redirect() : page.redirect;
        }

        if (!page.state && page.url) {
            return page.url;
        }

        if (!page.state && !page.url && page.pages && page.pages.length) {
            return this._getLinkFromPage(page.pages[0], params);
        }

        if (!page.state) {
            return [''];
        }

        let stateOptions = page.stateOptions ? {...params, ...page.stateOptions} : {...params};

        return this.$state.href(page.state, stateOptions).replace(/\/sf\/ui/g, '');
    }

}
