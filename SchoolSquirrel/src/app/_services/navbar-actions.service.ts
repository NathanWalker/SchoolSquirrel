import { Injectable } from "@angular/core";
import { NavbarAction } from "./NavbarAction";

(window as any).actions = [];

@Injectable({
    providedIn: "root",
})
export class NavbarActionsService {
    public static addActions(route: string, ...actions: NavbarAction[]): void {
        (window as any).actions.push(...actions);
    }

    public getNavbarActions(): NavbarAction[] {
        return (window as any).actions;
    }
}
