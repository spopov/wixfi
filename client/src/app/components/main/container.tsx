import * as React from "react";
import {CircularProgress, Container, Grid, withStyles} from "@material-ui/core";
import { AppToolbar } from "./header/app-toolbar";
import {inject} from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { observer } from "mobx-react";

const useStyles = (theme) => ({
    container: {
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    loading: {
        height: "100vh"
    }
});

@observer
class MainContainerElement extends React.Component<any> {
    @inject appStore: AppStore;

    render() {
        const { classes } = this.props;

        return this.appStore.isLoading ?
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  className={classes.loading}>
                <Grid item xs={3}>
                    <CircularProgress disableShrink />
                </Grid>
            </Grid>:
            <Container className={classes.container} maxWidth={false}>
            <AppToolbar />
        </Container>;
    }

    componentDidMount() {
        this.appStore.init();
    }
}

export const MainContainer = withStyles(useStyles)(MainContainerElement);