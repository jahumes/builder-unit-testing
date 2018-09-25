import {Observable} from "rxjs";
import {NavigationExtras, UrlTree} from "@angular/router";
import {Link, NavItem} from "../../interfaces/navigation.interface";
import {NavBadgeBuilder} from "./nav-badge.builder";
import { BaseBuilder } from "../../../../test-helpers/builders/base.builder";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export class NavItemBuilder extends BaseBuilder implements NavItem {

    badge?: NavBadgeBuilder;
    children?: NavItemBuilder[];
    icon?: IconDefinition;
    label: string;
    link: Link;
    queryParams?: { [p: string]: any };
    extras?: NavigationExtras;

    constructor() {
        super();
        this.link = ["/default-link"];
        this.label = "Default Label";
        this.children = [];
    }

    static list(...items: NavItemBuilder[]) {
        return items.map(item => item.build());
    }

    withBadgeValue(value: Observable<string | number> | string | number) {
        if (!this.badge) {
            this.badge = new NavBadgeBuilder;
        }

        this.badge.withValue(value);

        return this;
    }

    withChild(child: NavItemBuilder) {
        this.children.push(child);

        return this;
    }

    withBadge(badge: NavBadgeBuilder) {
        this.badge = badge;

        return this;
    }

    withLink(link: Link) {
        this.link = link;

        return this;
    }

    withLabel(label: string) {
        this.label = label;

        return this;
    }

    build(): NavItem {
        let item: NavItem = {
            label: this.label,
            link: this.link,
        };
        if (this.badge) {
            item.badge = this.badge.build();
        }
        if (this.children.length > 0) {
            item.children = this.children.map(child => child.build());
        }

        return item;
    }
}
