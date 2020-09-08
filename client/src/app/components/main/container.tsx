import * as React from "react";
import { Container, withStyles} from "@material-ui/core";
import { AppToolbar } from "./header/app-toolbar";
import {inject, provider} from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { observer } from "mobx-react";
import {Loading} from "app/components/common/loading/loading";

const useStyles = (theme) => ({
    container: {
        paddingLeft: "0px",
        paddingRight: "0px"
    }
});

@provider(AppStore)
@observer
class MainContainerElement extends React.Component<any> {
    @inject appStore: AppStore;

    render() {
        const { classes } = this.props;

        return this.appStore.isLoading ?
            <Loading /> :
            <Container className={classes.container} maxWidth={false}>
            <AppToolbar />
        </Container>;
    }

    componentDidMount() {
        this.appStore.init();
    }
}

export const MainContainer = withStyles(useStyles)(MainContainerElement);