import {action, observable, runInAction} from "mobx";
import { Header } from "../models";

export class AppStore {
    @observable
    isAuthorized: boolean = true;

    @observable
    headerItems: Header.IHeaderButton[] = [];

    @observable
    isLoading: boolean = true;

    @observable
    selectedHeaderItem : string;

    @action
    selectHeaderItem(value: string) {
        this.selectedHeaderItem = value;
    }

    @action
    init() {
        this.isLoading = true;

        this.headerItems.push(Header.owner);
        this.headerItems.push(Header.propertyManager);
        this.headerItems.push(Header.tenant);
        this.headerItems.push(Header.expert);
        this.headerItems.push(Header.support);

        this.selectedHeaderItem = this.headerItems[0].name;

        setTimeout(() => {
            runInAction(() => this.isLoading = false);
        }, 2000);
    }
}