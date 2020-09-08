import {Grid, createStyles, Theme, withStyles, Tabs, Tab} from "@material-ui/core";
import {observer} from "mobx-react";
import * as React from "react";
import { Dashboard, List, Domain, People, Payment } from '@material-ui/icons';
import {styles} from "app/const/style";

const useStyles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(3)
    },
    tabSelected: {
        color: "white !important",
        backgroundColor: styles.colorSelected,
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        border: "none"
    },
    tab: {
        color: styles.color,
        fontWeight: 300
    },
    tabIndicator: {
        backgroundColor: styles.colorSelected
    }
});

export const AppMenu = withStyles(useStyles)(observer((props: { classes: any }) => {
    props.classes;

    const tabClasses = {
        selected: props.classes.tabSelected,
        root: props.classes.tab
    }

    return <Grid container justify="center" className={props.classes.container}>
        <Tabs
            value="Billing"
            onChange={() => {}}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            classes={{ indicator: props.classes.tabIndicator }}
        >
            <Tab label="Dashboard" icon={<Dashboard fontSize="large" />} value="Dashboard" classes={tabClasses} />
            <Tab label="Requests" icon={<List fontSize="large" />} value="Requests" classes={tabClasses} />
            <Tab label="Listing" icon={<Domain fontSize="large" />} value="Listing" classes={tabClasses} />
            <Tab label="Billing" icon={<Payment fontSize="large" />} value="Billing" classes={tabClasses} />
            <Tab label="Tenants" icon={<People fontSize="large" />} value="Tenants" classes={tabClasses} />
        </Tabs>
    </Grid>;
}));