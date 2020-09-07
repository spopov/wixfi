import {AppBar, Toolbar, Badge, IconButton, Menu, MenuItem, Typography, Avatar} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from '@material-ui/icons/Search';
import * as React from "react";
import {makeStyles} from "@material-ui/styles";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: "#5d7ad1",
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
        paddingLeft: "50px",
        paddingRight: "50px",
        fontWeight: 100,
        height: "58px"
    },
    btnSelected: {
        backgroundColor: "#7d94da !important"
    }
}));

export const AppToolbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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

    return <div className={classes.grow}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h4" noWrap className={classes.title}>
                    Wixfi
                </Typography>
                <div className={classes.grow} />
                <ToggleButtonGroup size="medium" value={"left"} exclusive onChange={() => {}}>
                    <ToggleButton value="left" className={classes.button} classes={{ selected: classes.btnSelected }}>
                        Owner
                    </ToggleButton>
                    <ToggleButton value="center" className={classes.button} classes={{ selected: classes.btnSelected }}>
                        Property Manager
                    </ToggleButton>
                    <ToggleButton value="right" className={classes.button} classes={{ selected: classes.btnSelected }}>
                        Tenant
                    </ToggleButton>
                    <ToggleButton value="justify" className={classes.button} classes={{ selected: classes.btnSelected }}>
                        Expert
                    </ToggleButton>
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
}