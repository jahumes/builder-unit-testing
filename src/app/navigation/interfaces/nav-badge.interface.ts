import {Observable} from "rxjs";
import {Type} from "@angular/core";
import { NavBadgeComponent } from "../components/nav-badge/nav-badge.component";

export interface NavItemBadge {
    value: Observable<number | string> | number | string;
    component?: Type<NavBadgeComponent>;
    type?: Observable<BadgeType> | BadgeType;
    extras?: Observable<any> | any;
}

export enum BadgeType {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Default = "default"
}
