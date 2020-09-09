import {Grid, createStyles, Theme, withStyles, Tabs, Tab} from "@material-ui/core";
import {observer} from "mobx-react";
import * as React from "react";
import {Dashboard, List, Domain, People, Payment} from '@material-ui/icons';
import {styles} from "app/const/style";
import {useInstance} from "react-ioc";
import {AppStore} from "app/stores/AppStore";
import * as Header from "../../../models/header-items";
import {useHistory} from "react-router";

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

const iconMap: Map<string, any> = new Map([
    [Header.dashboard.name, <Dashboard fontSize="large" />],
    [Header.requests.name, <List fontSize="large" />],
    [Header.properties.name, <Domain fontSize="large" />],
    [Header.billing.name, <Payment fontSize="large" />],
    [Header.tenants.name, <People fontSize="large" />]
]);

export const AppMenu = withStyles(useStyles)(observer((props: { classes: any }) => {
    props.classes;

    const tabClasses = {
        selected: props.classes.tabSelected,
        root: props.classes.tab
    }

    const app = useInstance(AppStore);
    const history = useHistory();

    return <Grid container justify="center" className={props.classes.container}>
        <Tabs
            value={app.selectedMenuHeaderItem}
            onChange={(event: React.MouseEvent<HTMLElement>, value: string) => app.selectMenuHeaderItem(value, history)}
            variant="fullWidth"
            classes={{ indicator: props.classes.tabIndicator }}
        >
            {
                app.menuHeaderItems.map(x =>
                    <Tab label={x.name} icon={iconMap.get(x.name)} value={x.name} key={x.name} classes={tabClasses} />
                )
            }
        </Tabs>
    </Grid>;
}));