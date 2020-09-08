import * as React from "react";
import { Container, withStyles} from "@material-ui/core";
import { AppToolbar } from "./header/app-toolbar";
import { inject, provider } from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { observer } from "mobx-react";
import { Loading } from "app/components/common/loading/loading";
import {AppMenu} from "app/components/main/header/app-menu";
import {styles} from "app/const/style";

const useStyles = (theme) => ({
    container: {
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    content: {
        borderStyle: "solid",
        borderRadius: "10px",
        borderWidth: "8px",
        borderColor: styles.colorSelected
    },
    contentOuter: {
        paddingLeft: "30px",
        paddingRight: "30px"
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
                <AppMenu />
                <Container className={classes.contentOuter} maxWidth={false}>
                    <Container className={classes.content} maxWidth={false}>
                        <h1>www</h1>
                    </Container>
                </Container>
            </Container>;
    }

    componentDidMount() {
        const { history } = this.props;
        const currentPath = history.location.pathname?.split("/")[1];

        this.appStore.init(currentPath);
    }
}

export const MainContainer = withStyles(useStyles)(MainContainerElement);