import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import {provider, inject} from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { MainContainer } from "app/components/main/container";
import "./index.css";
import {observer} from "mobx-react";

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
@provider(AppStore)
@observer
export class App extends React.Component<any> {
    @inject appStore: AppStore;

    render() {
        return this.appStore.isAuthorized ? appRoutes(this.props.history) : authRoutes(this.props.history);
    }
}
