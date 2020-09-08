import { Route, Router, Switch } from "react-router";
import {MainContainer} from "app/components/main/container";
import * as React from "react";
import * as Header from '../../models/header-items';

export const AppRoutes = (history) => {
    return <Router history={history}>
        <Switch>
            <Route path="/" component={MainContainer}/>
            <Route path={Header.owner.path} component={MainContainer} />
            <Route path={Header.propertyManager.path} component={MainContainer} />
            <Route path={Header.tenant.path} component={MainContainer} />
            <Route path={Header.expert.path} component={MainContainer} />
            <Route path={Header.support.path} component={MainContainer} />
        </Switch>
    </Router>
}