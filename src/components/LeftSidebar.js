import React, { Fragment, forwardRef } from "react";
import { 
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Drawer,
    Typography
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import { LoginVariant, AccountPlus, AccountGroup } from 'mdi-material-ui';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from './../store/actions/app.js';
import './../sass/LeftSidebar.scss';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const LeftSidebar = () => {

    // redux
    const redux = useSelector(state => state);
    const dispatch = useDispatch();

    //methods
    const handleToggleSidebar = (mobile) => {
        if(!mobile) return;
        dispatch( toggleSidebar() );
    }

    const Sidebar = ({mobile}) => {
        return ( 
            <Fragment>
                <div className="sidebar">
                    <List
                        dense
                        component="nav"
                        >
                            <ListItem
                                exact
                                activeClassName={"Mui-selected"}
                                button
                                onClick={() => handleToggleSidebar(mobile)}
                                component={ForwardNavLink}
                                to={"/" }
                            >
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <Divider/>
                            <ListItem
                                exact
                                activeClassName={"Mui-selected"}
                                button
                                onClick={() => handleToggleSidebar(mobile)}
                                component={ForwardNavLink}
                                to={"/categories" }
                            >
                                <ListItemIcon>
                                    <CategoryIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Categories" />
                            </ListItem>
                            <Divider/>
                            <ListItem
                                activeClassName={"Mui-selected"}
                                button
                                onClick={() => handleToggleSidebar(mobile)}
                                component={ForwardNavLink}
                                to={"/community" }
                            >
                                <ListItemIcon>
                                    <AccountGroup/>
                                </ListItemIcon>
                                <ListItemText primary="Community" />
                            </ListItem>
                            <Divider/>
                            <ListItem
                                activeClassName={"Mui-selected"}
                                button
                                onClick={() => handleToggleSidebar(mobile)}
                                component={ForwardNavLink}
                                to={"/collections" }
                            >
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Collections" />
                            </ListItem>
                            <Divider/>
                            {!redux.app.loggedin && (
                                <div className="d-md-none">
                                    <ListItem
                                        exact
                                        activeClassName={"Mui-selected"}
                                        button
                                        component={ForwardNavLink}
                                        onClick={() => handleToggleSidebar(mobile)}
                                        to={"/login" }
                                    >
                                        <ListItemIcon>
                                            <LoginVariant/>
                                        </ListItemIcon>
                                        <ListItemText primary="Login" />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem
                                        exact
                                        activeClassName={"Mui-selected"}
                                        button
                                        component={ForwardNavLink}
                                        onClick={() => handleToggleSidebar(mobile)}
                                        to={"/signup" }
                                    >
                                        <ListItemIcon>
                                            <AccountPlus/>
                                        </ListItemIcon>
                                        <ListItemText primary="Signup" />
                                    </ListItem>
                                    <Divider/>
                                </div>
                            )}
                            
                    </List>

                    <List
                        dense
                        component="nav"
                        aria-labelledby="platform-list-subheader"
                        subheader={
                            <ListSubheader disableSticky={true} component="div" id="platform-list-subheader">
                                Platforms
                            </ListSubheader>
                        }
                        >
                            
                            <Divider/>
                            {
                                redux.platforms.map((platform, index) => {
                                    return(
                                        <Fragment key={platform._id}>
                                            <ListItem
                                                activeClassName={"Mui-selected"}
                                                button
                                                component={ForwardNavLink}
                                                to={'/' + platform.slug}
                                                onClick={() => handleToggleSidebar(mobile)}
                                            >
                                                <ListItemIcon>
                                                    <img height="100%" width="20" src={platform.logo} alt={`Logo of ${platform.name}`}/>
                                                </ListItemIcon>
                                                <ListItemText primary={platform.name} />
                                            </ListItem>
                                            { index < redux.platforms.length - 1 && <Divider/> }
                                        </Fragment>
                                    )
                                })
                            }
                    </List>
                    <Divider className="my-0"/> 
                    <div className="sidebar-footer p-3">
                        <Typography variant="caption" className="d-block mb-1">
                            CarbonBot and the CarbonBot Logo are trademarks of CarbonBot Inc.
                        </Typography>
                        <Typography variant="caption" className="d-block">
                            &copy; {new Date().getFullYear()} CarbonBot Inc. All Rights Reserved.
                        </Typography>
                    </div>
                </div>
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <Drawer 
                keepMounted={false}
                anchor="left" 
                open={redux.app.sidebar} 
                onClose={() => dispatch( toggleSidebar() )}
                >
                    <div className="drawer h-100">
                        <Sidebar
                            mobile={true}
                        />
                    </div>
            </Drawer>
            <Sidebar
                mobile={false}
            />
        </Fragment>
    )

}

export default LeftSidebar;