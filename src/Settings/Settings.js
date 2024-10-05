import React, { Fragment } from "react";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";
import { 
    Profile,
    Bots,
    Collections,
    Security,
    Company,
    Reviews,
    NewBot,
    NewCollection,
    EditCollection,
    EditBot,
    EditReview
} from './index';
import { Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Robot, Domain } from 'mdi-material-ui';
import CommentIcon from '@material-ui/icons/Comment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { useSelector } from 'react-redux';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Settings() {
    
    // redux
    const app = useSelector(state => state.app);

    if(!app.loggedin) {
        return <Redirect to="/"/>
    }

    return (
        <Fragment>
            <div className="col-md-10 col-12">
                <div className="row">
                    <div className="col-md-3 col-12 mb-3 mb-md-0">
                            <Paper variant="outlined">
                                <List dense>
                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/profile"}
                                        >
                                        <ListItemIcon>
                                            <AccountCircleIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItem>

                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/security"}
                                        >
                                        <ListItemIcon>
                                            <LockIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Security" />
                                    </ListItem>
                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/company"}
                                        >
                                        <ListItemIcon>
                                            <Domain style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Company" />
                                    </ListItem>
                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/bots"}
                                        >
                                        <ListItemIcon>
                                            <Robot style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="My Bots" />
                                    </ListItem>
                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/reviews"}
                                        >
                                        <ListItemIcon>
                                            <CommentIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="My Reviews" />
                                    </ListItem>
                                    <ListItem 
                                        activeClassName="Mui-selected"
                                        button
                                        component={ForwardNavLink}
                                        to={"/settings/collections"}
                                        >
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="My Collections" />
                                    </ListItem>
                                </List>
                            </Paper>
                        </div>
                        <div className="col-md-9 col-12">
                
                            <Route exact path={'/settings/profile'} render={(props) => <Profile {...props} />} />
                            <Route exact path={'/settings/security'} render={(props) => <Security {...props} />} />
                            <Route exact path={'/settings/company'} render={(props) => <Company {...props} />} />
                            <Route exact path={'/settings/bots'} render={(props) => <Bots {...props} />} />
                            <Route exact path={'/settings/reviews'} render={(props) => <Reviews {...props} />} />
                            <Route exact path={'/settings/reviews/:id'} render={(props) => <EditReview {...props} />} />
                            <Route exact path={'/settings/collections'} render={(props) => <Collections {...props} />} />
                            <Switch>
                                <Route exact path={'/settings/bots/new'} render={(props) => <NewBot {...props} />} />
                                <Route exact path={'/settings/bots/:id'} render={(props) => <EditBot {...props} />} />
                                <Route exact path={'/settings/collections/new'} render={(props) => <NewCollection {...props} />} />
                                <Route exact path={'/settings/collections/:id'} render={(props) => <EditCollection {...props} />} />
                            </Switch>
                        </div>
                </div>
            </div>
        </Fragment>
        
    )

}
