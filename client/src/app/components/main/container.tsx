import * as React from "react";
import {Container} from "@material-ui/core";
import { AppToolbar } from "./header/app-toolbar";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: "0px",
        paddingRight: "0px"
    }
}));

export const MainContainer = () => {
    const classes = useStyles();

    return <Container className={classes.container} maxWidth={false}>
        <AppToolbar />
    </Container>;
}