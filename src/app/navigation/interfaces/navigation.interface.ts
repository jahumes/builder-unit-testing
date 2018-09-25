import {ActivatedRouteSnapshot, NavigationExtras, Resolve, RouterStateSnapshot} from "@angular/router";
import {NavItemBadge} from "./nav-badge.interface";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {Observable} from "rxjs";

export interface NavListResolver extends Resolve<any> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Navigation> | Promise<Navigation> | Navigation;
}

export interface Navigation {
    parent: NavItem;
    items: NavItem[];
}

export declare type Link = any[];

export interface NavItem {
    link: Link;
    label: string;
    queryParams?: { [k: string]: any; };
    extras?: NavigationExtras;
    children?: NavItem[];
    badge?: NavItemBadge;
    icon?: IconDefinition;
}
