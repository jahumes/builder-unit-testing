import { BaseBuilder } from "../../../../test-helpers/builders/base.builder";
import { AngularJSPage } from "../../interfaces/angularjs-page.interface";

export class AngularjsPageBuilder extends BaseBuilder implements AngularJSPage {
    name?: string;
    label: string;
    title?: string;
    state?: string;
    pages?: AngularjsPageBuilder[];
    counter?: number;
    link?: string[];
    stateOptions?: { [p: string]: string | number };
    url?: string;

    constructor() {
        super();
        this.label = "Default Label";
        this.state = "default.state";
    }

    withPage(page: AngularjsPageBuilder): this {
        if (!this.pages) {
            this.pages = [];
        }

        this.pages.push(page);

        return this;
    }

    withName(name: string): this {
        this.name = name;

        return this;
    }

    withLabel(label: string): this {
        this.label = label;

        return this;
    }

    withTitle(title: string): this {
        this.title = title;

        return this;
    }

    withState(state: string): this {
        this.state = state;

        return this;
    }

    withLink(link: any[]): this {
        this.link = link;

        return this;
    }

    withStateOption(key: string, value: string | number): this {
        if (!this.stateOptions) {
            this.stateOptions = {};
        }
        this.stateOptions[key] = value;

        return this;
    }

    withUrl(url: string): this {
        this.url = url;

        return this;
    }

    withCounter(counter: number): this {
        this.counter = counter;

        return this;
    }


    // build(): AngularJSPage {
    //     let pages = this.pages.map(page => page.build());
    //     return {
    //         name: this.name,
    //         label: this.label,
    //         title: this.title,
    //         state: this.state,
    //         pages: pages
    //     };
    // }
}
