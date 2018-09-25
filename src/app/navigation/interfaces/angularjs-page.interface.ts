export interface AngularJSPage {
    name?: string;
    label: string;
    title?: string;
    state?: string;
    url?: string;
    link?: string[];
    redirect?: any;
    stateOptions?: { [key: string]: string | number };
    pages?: AngularJSPage[];
    counter?: number;
}

export interface AngularJSPageService {
    getPages(): AngularJSPage[];
    getParentState?(): string | undefined;
    getParentUrl?(): string | undefined;
    getLabel(): string;
}
