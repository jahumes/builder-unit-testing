import { AngularJSPageService } from "../../interfaces/angularjs-page.interface";
import { AngularjsPageBuilder } from "../builders/angularjs-page.builder";
import { BaseMock } from "../../../../test-helpers/mocks/base.mock";


export class AngularjsPageServiceMock extends BaseMock implements AngularJSPageService {

    pages: AngularjsPageBuilder[] = [];
    getPages = jest.fn().mockReturnValue(this.pages);
    getParentState: jest.Mock;
    getParentUrl: jest.Mock;
    getLabel = jest.fn().mockReturnValue("Default Label");

    withPage(page: AngularjsPageBuilder) {
        this.pages.push(page);

        return this;
    }

    withParentState(state: string) {
        this.getParentState = jest.fn().mockReturnValue(state);

        return this;
    }

    withParentUrl(url: string) {
        this.getParentUrl = jest.fn().mockReturnValue(url);

        return this;
    }

    withParentLabel(label: string) {
        this.getLabel = jest.fn().mockReturnValue(label);

        return this;
    }
}
