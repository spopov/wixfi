import {action, observable, runInAction} from "mobx";
import * as Header from "../models/header-items";

export class AppStore {
    @observable
    headerItems: Header.IHeaderButton[] = [];

    @observable
    isLoading: boolean = true;

    @observable
    selectedHeaderItem : string;

    @action
    selectHeaderItem(value: string, history: any) {
        this.selectedHeaderItem = value;

        const found = this.headerItems.find(x => x.name == value);
        if(!found) {
            return;
        }

        history.push(found.path);
    }

    @action
    init(currentPath: string) {
        this.isLoading = true;

        this.headerItems.push(Header.owner);
        this.headerItems.push(Header.propertyManager);
        this.headerItems.push(Header.tenant);
        this.headerItems.push(Header.expert);
        this.headerItems.push(Header.support);

        let defaultItem = this.headerItems[0].name;

        if(currentPath) {
            const found = this.headerItems.find(x => x.path.toLowerCase() == '/' + currentPath);

            if(found) {
                defaultItem = found.name;
            }
        }

        this.selectedHeaderItem = defaultItem;

        setTimeout(() => {
            runInAction(() => this.isLoading = false);
        }, 1000);
    }
}