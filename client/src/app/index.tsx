import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { useInstance, provider} from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { MainContainer } from "app/components/main/container";
import "./index.css";

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

export const App = provider(AppStore)(hot(({ history }) => {
    const app = useInstance(AppStore);
    return app.isAuthorized ? appRoutes(history) : authRoutes(history);
}));
