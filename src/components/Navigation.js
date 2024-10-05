import React, { useState, Fragment, useEffect } from "react";
import { 
    Divider, 
    IconButton,
    Toolbar,
    AppBar,
    Button,
    Menu,
    MenuItem,
    Badge
} from '@material-ui/core';
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import './../sass/Navigation.scss';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { Logout, toggleSidebar } from './../store/actions/app.js';
import { getUnreadCount } from './../helpers/manageNotifications';
import Avatar from './Avatar';
import logo from './../assets/logo.png';
import Search from './Search/index';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { SetCount } from './../store/actions/notifications.js';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const Navigation = (props) => {

    // state
    const [anchorEl, setAnchorEl] = useState(null);

    // redux
    const redux = useSelector(state => state);
    const dispatch = useDispatch();

    // lifecycles
    useEffect(() => {
        if(redux.app.loggedin) handleGetUnreadCount(redux.app.token);
    },[])

    // methods
    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch( Logout() );
    };

    const handleGetUnreadCount = async(token) => {
        const [error, response] = await getUnreadCount(token);
        if(error) return;
        dispatch(SetCount(response.data));
    }

    return (
        <Fragment>
            <AppBar 
                position="static" 
                color="transparent" 
                elevation={0}
                >
                <Toolbar disableGutters={true}>
                    <div className="container-fluid">
                        <div className="row app-header align-items-center">
                            <div className="col-md-4 col-2 d-flex align-items-center">
                                <Link to="/"><img src={logo} className="logo-image regular"/></Link>
                                <div className={redux.app.loggedin ? 'logo-copy d-none d-md-block' : 'logo-copy'}>
                                    <Link to="/">CarbonBot</Link>
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block">
                                <Search {...props}/>
                            </div>
                            <div className="col-md-4 col-10 text-right user-menu">
                                {
                                    !redux.app.loggedin ? (
                                        <Fragment>
                                            <IconButton
                                                onClick={() => dispatch(toggleSidebar())}
                                                className="d-inline-block d-md-none"
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                keepMounted={false}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem 
                                                    component={ForwardNavLink}
                                                    to="/login"
                                                    onClick={handleClose}
                                                    >
                                                    Login
                                                </MenuItem>
                                                <MenuItem 
                                                    component={ForwardNavLink}
                                                    to="/signup"
                                                    onClick={handleClose}
                                                    >
                                                    Sign Up
                                                </MenuItem>
                                            </Menu>
                                            <span className="d-none d-md-inline-block">
                                                <Button 
                                                    component={ForwardNavLink}
                                                    to="/login"
                                                    color="default" 
                                                    className="button-link mr-2">
                                                        Login
                                                </Button>
                                                <Button
                                                    className="button-link"
                                                    component={ForwardNavLink}
                                                    to="/signup"
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Sign up
                                                </Button>
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <IconButton
                                                component={ForwardNavLink}
                                                to="/notifications"
                                                size="small"
                                                className="mr-3"
                                            >
                                                <Badge badgeContent={redux.notifications} color="primary">
                                                    <NotificationsIcon/>
                                                </Badge>
                                            </IconButton>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className="mr-3 d-none d-md-inline-block"
                                                startIcon={<AddIcon/>}
                                                component={ForwardNavLink}
                                                to="/settings/bots/new"
                                            >
                                                New Bot
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className="mr-1 d-inline d-md-none"
                                                component={ForwardNavLink}
                                                to="/settings/bots/new"
                                            >
                                                New Bot
                                            </Button>
                                            <IconButton
                                                onClick={() => dispatch(toggleSidebar())}
                                                className="d-inline-block d-md-none"
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                            <IconButton
                                                className="p-0"
                                                onClick={handleToggle}
                                            >
                                                <Avatar user={redux.app.user} size={46} link={false}/>
                                            </IconButton>
                                            
                                            <Menu
                                                variant={'menu'}
                                                anchorEl={anchorEl}
                                                keepMounted={false}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                
                                            >
                                                <MenuItem
                                                    component={ForwardNavLink}
                                                    to={"/u/" + redux.app.user.username}
                                                    onClick={handleClose}
                                                    >
                                                    My Profile
                                                </MenuItem>
                                                <Divider/>
                                                <MenuItem 
                                                    component={ForwardNavLink}
                                                    to="/settings/bots"
                                                    onClick={handleClose}
                                                    >
                                                    Edit Bots
                                                </MenuItem>
                                                <MenuItem 
                                                    component={ForwardNavLink}
                                                    to="/settings/collections"
                                                    onClick={handleClose}
                                                    >
                                                    Edit Collections
                                                </MenuItem>
                                                <MenuItem 
                                                    component={ForwardNavLink}
                                                    to="/settings/reviews"
                                                    onClick={handleClose}
                                                    >
                                                    Edit Reviews
                                                </MenuItem>
                                                <MenuItem
                                                    component={ForwardNavLink}
                                                    to={"/settings/profile"}
                                                    onClick={handleClose}
                                                    >
                                                    Edit Profile
                                                </MenuItem>
                                                <Divider/>
                                                <MenuItem 
                                                    onClick={() => {
                                                        handleClose();
                                                        handleLogout();
                                                    }}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
        
    )

}

export default withRouter(Navigation);