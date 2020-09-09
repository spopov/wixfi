import {
    AppBar,
    Toolbar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Avatar,
    Theme, createStyles, withStyles
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from '@material-ui/icons/Search';
import * as React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useInstance } from "react-ioc";
import { AppStore } from "app/stores/AppStore";
import { observer } from "mobx-react";
import {useHistory} from "react-router";
import {styles} from "app/const/style";

const useStyles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: styles.color,
        paddingLeft: "30px",
        paddingRight: "30px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
    },
    toolBar: {
        minHeight: "55px"
    },
    title: {
        fontWeight: 500
    },
    avatar: {
        border: "white solid 2px",
        width: "30px",
        height: "30px",
    },
    button: {
        color: "white !important",
        border: "none",
        borderRadius: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        fontWeight: 100,
        height: "58px",
        fontSize: "9pt"
    },
    btnSelected: {
        backgroundColor: styles.colorSelected + ' !important'
    }
});

export const AppToolbar = withStyles(useStyles)(observer((props: { classes: any }) => {
    const classes = props.classes;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const app = useInstance(AppStore);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const history = useHistory();

    return <div className={classes.grow}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h4" noWrap className={classes.title}>
                    Wixfi
                </Typography>
                <div className={classes.grow} />
                <ToggleButtonGroup size="medium" value={app.selectedHeaderItem} exclusive
                                   onChange={(event: React.MouseEvent<HTMLElement>, value: string) => app.selectHeaderItem(value, history)}>
                    {

                        app.headerItems.map(x =>
                            <ToggleButton key={x.name} value={x.name} className={classes.button} classes={{ selected: classes.btnSelected }}>
                                {x.name}
                            </ToggleButton>)
                    }
                </ToggleButtonGroup>
                <div className={classes.grow} />
                <IconButton aria-label="search" color="inherit">
                    <SearchIcon fontSize="default" />
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <Avatar className={classes.avatar}>SP</Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>
        {renderMenu}
    </div>;
}))