import React, { useEffect, forwardRef, Fragment, useState } from "react";
import { 
    Breadcrumbs, 
    Typography,
    Divider,
    Paper,
    ListItemIcon,
    List,
    ListSubheader,
    ListItem,
    ListItemText
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, NavLink, Route } from 'react-router-dom';
import { getProfileByUsername } from '../helpers/manageUser';
import Avatar from '../components/Avatar';
import { useSelector } from 'react-redux';
import { NewspaperVariantOutline } from 'mdi-material-ui';
import { Robot } from 'mdi-material-ui';
import CommentIcon from '@material-ui/icons/Comment';
import Posts from './Posts';
import Reviews from './Reviews';
import Bots from './Bots';
import Collections from './Collections';
import Links from '../components/Links';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Profile({match,location}) {

    // state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // redux
    const redux = useSelector(state => state);

    // lifecycle
    useEffect(() => {
        handleGetProfile(match.params.username)
    },[match.params.username])

    // methods
    const handleGetProfile = async(username) => {
        const [error, response] = await getProfileByUsername(username);
        if(error) {
            return; // todo: handle
        }
        setUser(response.data);
        setLoading(false);
    }

    if(loading) return null

    return (
        <Fragment>
            <div className="col-md-9 col-12 mb-3">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    <Link color="inherit" to="/community">
                        Community
                    </Link>
                    <Typography color="textPrimary">Profile</Typography>
                </Breadcrumbs>
            </div>
            <div className="col-md-9 col-12 d-flex mb-3">
                <Avatar
                    user={user}
                    size={97}
                />
                <div className="ml-3">
                    <Typography variant="h5">
                        {user?.profile && user?.profile?.display_name ? user?.profile?.display_name : user?.username}
                    </Typography>
                    <Typography variant="body1" className="my-1">
                        {user.profile?.about}
                    </Typography>
                    <div className="d-flex align-items-center">
                        
                    </div>
                </div>
            </div>
            <div className="col-md-9 col-12">
                <div className="row">
                    <div className="col-md-8 col-12 order-md-0 order-1">
                        <Route exact path={'/u/:username'} render={(props) => <Posts user_id={user._id} {...props} />} />
                        <Route exact path={'/u/:username/reviews'} render={(props) => <Reviews user_id={user._id} {...props} />} />
                        <Route exact path={'/u/:username/bots'} render={(props) => <Bots user_id={user._id} {...props} />} />
                        <Route exact path={'/u/:username/collections'} render={(props) => <Collections user_id={user._id} {...props} />} />
                    </div>
                    <div className="col-md-4 col-12 order-md-1 order-0 mb-md-0 mb-3">
                        <Paper elevation={0} variant="outlined" className="mb-3">
                            <List
                                dense
                                component="div"
                                aria-labelledby="channels-subheader"
                                subheader={
                                    <ListSubheader component="div" id="channels-subheader" disableSticky={true}>
                                        Discover
                                    </ListSubheader>
                                }
                                >   
                                    <ListItem
                                        component={ForwardNavLink}
                                        exact
                                        to={"/u/" + match.params.username}
                                        activeClassName={"Mui-selected"}
                                        button
                                    >
                                        <ListItemIcon>
                                            <NewspaperVariantOutline style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Posts"} />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem
                                        exact
                                        component={ForwardNavLink}
                                        to={"/u/" + match.params.username + "/bots"}
                                        activeClassName={"Mui-selected"}
                                        button
                                    >
                                        <ListItemIcon>
                                            <Robot style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Bots"} />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem
                                        exact
                                        component={ForwardNavLink}
                                        to={"/u/" + match.params.username + "/reviews"}
                                        activeClassName={"Mui-selected"}
                                        button
                                    >
                                        <ListItemIcon>
                                            <CommentIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Reviews"} />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem
                                        exact
                                        component={ForwardNavLink}
                                        to={"/u/" + match.params.username + "/collections"}
                                        activeClassName={"Mui-selected"}
                                        button
                                    >
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon style={{opacity: 0.6}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Collections"} />
                                    </ListItem>
                            </List>
                        </Paper>
                        <Links property={user.profile}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}