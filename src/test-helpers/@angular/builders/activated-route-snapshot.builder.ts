import {ActivatedRouteSnapshot, Data, ParamMap, Params, Route, UrlSegment} from "@angular/router";
import {Type} from "@angular/core";
import {ActivatedRouteBuilder} from "./activated-route.builder";
import { BaseBuilder } from "../../builders/base.builder";


export class ActivatedRouteSnapshotBuilder extends BaseBuilder implements ActivatedRouteSnapshot {
    children: ActivatedRouteSnapshot[];
    component: Type<any> | string | null;
    data: Data;
    firstChild: ActivatedRouteSnapshot | null;
    fragment: string;
    outlet: string;
    paramMap: ParamMap;
    params: Params;
    parent: ActivatedRouteSnapshot | null;
    pathFromRoot: ActivatedRouteSnapshot[];
    queryParamMap: ParamMap;
    queryParams: Params;
    root: ActivatedRouteSnapshot;
    routeConfig: Route | null;
    url: UrlSegment[];

    constructor(route: ActivatedRouteBuilder) {
        super();
        this.fromRoute(route);
    }

    fromRoute(route: ActivatedRouteBuilder): this {
        this.children = route.children.map(child => child.snapshot);
        this.component = route.component;
        this.firstChild = route.firstChild ? route.firstChild.snapshot : null;
        this.outlet = route.outlet;
        this.parent = route.parent ? route.parent.snapshot : null;
        this.pathFromRoot = route.pathFromRoot.map(path => path.snapshot);
        this.routeConfig = route.routeConfig;
        route.data.subscribe(data => this.data = data);
        route.params.subscribe(params => this.params = params);
        route.paramMap.subscribe(paramMap => this.paramMap = paramMap);
        route.queryParams.subscribe(queryParams => this.queryParams = queryParams);
        route.queryParamMap.subscribe(queryParamMap => this.queryParamMap = queryParamMap);
        route.url.subscribe(url => this.url = url);
        route.fragment.subscribe(fragment => this.fragment = fragment);

        return this;
    }

    withFirstChild(route: ActivatedRouteSnapshot): this {
        this.firstChild = route;

        return this;
    }

}
