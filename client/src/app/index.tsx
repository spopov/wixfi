import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import {provider, inject} from "react-ioc";
import { MainContainer } from "app/components/main/container";
import "./index.css";
import {observer} from "mobx-react";
import {AuthStore} from "app/stores/AuthStore";
import {Loading} from "app/components/common/loading/loading";

const authRoutes = (history) => <Router history={history}>
    <Switch>
        <Route path="/" component={MainContainer}/>
    </Switch>
</Router>;

const appRoutes = (history) => <Router history={history}>
    <Switch>
        <Route path="/" component={MainContainer}/>
    </Switch>
</Router>;

@hot
@provider(AuthStore)
@observer
export class App extends React.Component<any> {
    @inject authStore: AuthStore;

    render() {
        if (this.authStore.isLoading) {
            return <Loading />;
        }

        return this.authStore.isAuthorized ? appRoutes(this.props.history) : authRoutes(this.props.history);
    }

    componentDidMount() {
        this.authStore.init();
    }
}
