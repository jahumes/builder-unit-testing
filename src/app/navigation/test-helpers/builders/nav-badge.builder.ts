import {Observable} from "rxjs";
import {Type} from "@angular/core";
import { BaseBuilder } from "../../../../test-helpers/builders/base.builder";
import { NavItemBadge, BadgeType } from "../../interfaces/nav-badge.interface";
import { NavBadgeComponent } from "../../components/nav-badge/nav-badge.component";

export class NavBadgeBuilder extends BaseBuilder implements NavItemBadge {
    component: Type<NavBadgeComponent>;
    extras: Observable<any> | any;
    type: Observable<BadgeType> | BadgeType;
    value: Observable<number | string> | number | string;

    constructor() {
        super();
        this.value = "Default Value";
    }

    withValue(value: Observable<number | string> | number | string): this {
        this.value = value;

        return this;
    }

    withComponent(component: Type<NavBadgeComponent>): this {
        this.component = component;

        return this;
    }

    withExtras(extras: any): this {
        this.extras = extras;

        return this;
    }

    withType(type: Observable<BadgeType> | BadgeType): this {
        this.type = type;

        return this;
    }

    build(): NavItemBadge {
        let badge: NavItemBadge = {
            value: this.value
        };

        if (this.type) {
            badge.type = this.type;
        }

        if (this.extras) {
            badge.extras = this.extras;
        }

        if (this.component) {
            badge.component = this.component;
        }

        return badge;
    }
}
