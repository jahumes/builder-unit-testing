import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    convertToParamMap,
    Data,
    ParamMap,
    Params,
    Route,
    UrlSegment
} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Type} from "@angular/core";
import {ActivatedRouteSnapshotBuilder} from "./activated-route-snapshot.builder";
import {map} from "rxjs/operators";
import { BaseBuilder } from "../../builders/base.builder";


export class ActivatedRouteBuilder extends BaseBuilder implements ActivatedRoute {

    children: ActivatedRoute[];
    component: Type<any> | string | null;
    data: BehaviorSubject<Data>;
    firstChild: ActivatedRoute | null;
    fragment: BehaviorSubject<string>;
    outlet: string;
    params: BehaviorSubject<Params>;
    parent: ActivatedRoute | null;
    pathFromRoot: ActivatedRoute[];
    queryParams: BehaviorSubject<Params>;
    root: ActivatedRoute;
    routeConfig: Route | null;
    snapshot: ActivatedRouteSnapshotBuilder;
    url: BehaviorSubject<UrlSegment[]>;

    private _paramMap: Observable<ParamMap>;
    private _queryParamMap: Observable<ParamMap>;

    constructor() {
        super();
        this.url = new BehaviorSubject([]);
        this.params = new BehaviorSubject({});
        this.queryParams = new BehaviorSubject({});
        this.fragment = new BehaviorSubject("");
        this.data = new BehaviorSubject({});
        this.outlet = "";
        this.component = null;
        this.routeConfig = null;
        this.firstChild = null;
        this.parent = null;
        this.root = null;
        this.children = [];
        this.pathFromRoot = [];

        this.snapshot = new ActivatedRouteSnapshotBuilder(this);
    }

    withFirstChild(route: ActivatedRouteBuilder): this {
        this.firstChild = route;

        this.snapshot.withFirstChild(route.snapshot);

        return this;
    }

    withData(data: Data): this {
        this.data.next(data);

        return this;
    }

    withUrl(url: UrlSegment[]): this {
        this.url.next(url);

        return this;
    }

    withParent(parent: ActivatedRouteBuilder): this {
        this.parent = parent;

        return this;
    }

    withParams(params: Params): this {
        this.params.next(params);

        return this;
    }

    withFragment(fragment: string): this {
        this.fragment.next(fragment);

        return this;
    }

    get paramMap(): Observable<ParamMap> {
        if (!this._paramMap) {
            this._paramMap = this.params.pipe(map((p: Params): ParamMap => convertToParamMap(p)));
        }

        return this._paramMap;
    }

    get queryParamMap(): Observable<ParamMap> {
        if (!this._queryParamMap) {
            this._queryParamMap =
                this.queryParams.pipe(map((p: Params): ParamMap => convertToParamMap(p)));
        }
        return this._queryParamMap;
    }
}
