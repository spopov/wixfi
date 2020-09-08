import {Route, Router, Switch} from "react-router";
import {MainContainer} from "app/components/main/container";
import * as React from "react";

export const AuthRoutes = (history) => <Router history={history}>
    <Switch>
        <Route path="/" component={MainContainer}/>
    </Switch>
</Router>;