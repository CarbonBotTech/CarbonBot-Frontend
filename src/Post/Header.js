import React, { Fragment, useState, useContext } from "react";
import Avatar from './../components/Avatar'
import { NavLink, Link } from 'react-router-dom';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from './index';
import { deletePost } from './../helpers/manageCommunity';
import { useSelector } from 'react-redux';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const Header = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    // redux
    const redux = useSelector(state => state);

    // context
    const {state, dispatch} = useContext(AppContext);

    // methods
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const enableEdit = () => {
        if(state.post.type === 'article') {
            props.history.push('/community/' + state.post._id + '/edit');
            return;
        }
        dispatch({ type: 'TOGGLE_EDIT', payload: !state.edit});
    }
    const handleUnpublish = async () => {
        
        let confirmation = window.confirm("Are you sure?");
        if(confirmation) {
            const [error, response] = await deletePost(redux.app.token, state.post._id);
            dispatch({ type: 'SET_POST', payload: {
                ...state.post,
                approved: false
            }});
        }
    }

    return (
        <Fragment>
            <div className="header px-3 d-flex align-items-center mt-3">
                <div>
                    <Avatar user={state.post.user} size={40} link={true}/>
                </div>
                <div className="ml-3 d-flex justify-content-between w-100">
                    <div>
                        <Typography variant="body1" style={{lineHeight: 1.25}}>
                            <strong>
                                <Link style={{color: 'inherit'}} to={"/u/" + state.post.user.username}>{state.post.user.profile && state.post.user.profile.display_name ? state.post.user.profile.display_name : state.post.user.username}</Link>
                            </strong>
                        </Typography>
                        <Typography variant="caption">
                            {moment.utc(state.post.createdAt).tz( moment.tz.guess() ).fromNow()} {/* &middot; <Link to={"/community/" + state.post?.channel?.slug}>{state.post?.channel?.title}</Link> */}
                        </Typography>
                    </div>
                    <div>
                        {
                            <>
                                <IconButton 
                                    size="small" onClick={handleClick}
                                    >
                                    <MoreHorizIcon/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted={false}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem 
                                        component={ForwardNavLink}
                                        to={"/community/" + state.post._id}
                                    >
                                        Direct Link
                                    </MenuItem>
                                    {
                                        (redux.app.loggedin && state.post.user._id === redux.app.user.id) && (
                                            <span>
                                                <MenuItem 
                                                    onClick={() => {
                                                        handleClose()
                                                        enableEdit()
                                                    }}
                                                >
                                                    {state.edit ? 'Cancel' : 'Edit'}
                                                </MenuItem>
                                                <Divider/>
                                                <MenuItem 
                                                    style={{color:'#f44336'}}
                                                    onClick={() => {
                                                        handleClose()
                                                        handleUnpublish()
                                                    }}
                                                >
                                                    Unpublish
                                                </MenuItem>
                                            </span>
                                        )
                                    }
                                </Menu>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;

