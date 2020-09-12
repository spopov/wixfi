import {action, observable, runInAction} from "mobx";
import * as Header from "../models/header-items";

export class AppStore {
    @observable
    headerItems: Header.IHeaderButton[] = [];

    @observable
    menuHeaderItems: Header.IHeaderButton[] = [];

    headerItemRelation: Map<Header.IHeaderButton, Header.IHeaderButton[]> = new Map<Header.IHeaderButton, Header.IHeaderButton[]>();

    @observable
    isLoading: boolean = true;

    @observable
    selectedHeaderItem : string;

    @observable
    selectedMenuHeaderItem : string;

    @action
    selectHeaderItem(value: string, history: any) {
        const found = this.headerItems.find(x => x.name == value);
        if(!found) {
            return;
        }

        this.selectedHeaderItem = value;
        this.menuHeaderItems = this.headerItemRelation.get(found);
        this.selectedMenuHeaderItem = this.menuHeaderItems[0].name;

        history.push(found.path);
    }

    @action
    selectMenuHeaderItem(value: string, history: any) {
        const found = this.headerItems.find(x => x.name == this.selectedHeaderItem);
        const foundMenu = this.menuHeaderItems.find(x => x.name == value);
        if(!found || !foundMenu) {
            return;
        }

        this.selectedMenuHeaderItem = foundMenu.name;

        history.push(found.path + foundMenu.path);
    }

    @action
    init(currentPath: string, subPath: string, history: any) {
        this.isLoading = true;

        setTimeout(() => {
            runInAction(() => {
                const owner = Header.owner;
                this.headerItems.push(owner);
                this.headerItemRelation.set(owner, [Header.dashboard, Header.properties, Header.billing]);

                const propertyManager = Header.propertyManager;
                this.headerItems.push(propertyManager);
                this.headerItemRelation.set(propertyManager, [Header.dashboard, Header.requests, Header.properties, Header.billing, Header.tenants]);

                const tenant = Header.tenant;
                this.headerItems.push(tenant);
                this.headerItemRelation.set(tenant, [Header.dashboard, Header.requests, Header.billing]);

                const expert = Header.expert;
                this.headerItems.push(expert);
                this.headerItemRelation.set(expert, [Header.requests]);

                const support = Header.support;
                this.headerItems.push(support);
                this.headerItemRelation.set(support, [Header.requests]);

                let defaultItem = this.headerItems[0];
                this.menuHeaderItems = this.headerItemRelation.get(this.headerItems.find(x => x.name == defaultItem.name));
                let defaultMenuItem = this.menuHeaderItems[0];

                if(currentPath) {
                    const found = this.headerItems.find(x => x.path.toLowerCase() == '/' + currentPath);

                    if(found) {
                        defaultItem = found;
                        this.menuHeaderItems = this.headerItemRelation.get(found);

                        if (subPath) {
                            const foundMenu = this.menuHeaderItems
                                .find(x => x.path.toLowerCase() == '/' + subPath);

                            if (foundMenu) {
                                defaultMenuItem = foundMenu;
                            } else {
                                defaultMenuItem = this.menuHeaderItems[0];
                            }
                        }
                    }
                }

                this.selectedHeaderItem = defaultItem.name;
                this.selectedMenuHeaderItem = defaultMenuItem.name;

                this.isLoading = false;

                history.push(defaultItem.path + defaultMenuItem.path);
            });
        }, 1000);
    }
}