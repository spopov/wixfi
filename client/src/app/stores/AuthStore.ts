import {action, observable, runInAction} from "mobx";

export class AuthStore {
    @observable
    isAuthorized: boolean = true;

    @observable
    isLoading: boolean = true;

    @action
    init() {
        this.isLoading = true;

        this.isAuthorized = true;

        setTimeout(() => {
            runInAction(() => this.isLoading = false);
        }, 1000);
    }
}