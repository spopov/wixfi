import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import {provider, inject} from "react-ioc";
import "./index.css";
import {observer} from "mobx-react";
import {AuthStore} from "app/stores/AuthStore";
import {Loading} from "app/components/common/loading/loading";
import {AuthRoutes} from "app/components/routers/auth-router";
import {AppRoutes} from "app/components/routers/app-router";

@hot
@provider(AuthStore)
@observer
export class App extends React.Component<any> {
    @inject authStore: AuthStore;

    render() {
        if (this.authStore.isLoading) {
            return <Loading />;
        }

        return this.authStore.isAuthorized ? AppRoutes(this.props.history) : AuthRoutes(this.props.history);
    }

    componentDidMount() {
        this.authStore.init();
    }
}
