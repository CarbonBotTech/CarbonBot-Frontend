import React, { Fragment, useState, useContext } from "react";
import Avatar from './../components/Avatar'
import { NavLink, Link } from 'react-router-dom';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppContext } from './Review';
import { IconButton, MenuItem, Menu, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    // context
    const {state,dispatch} = useContext(AppContext);

    // redux
    const redux = useSelector(state => state);

    // methods
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            
            
            <div className="header px-3 d-flex align-items-center">
                <div>
                    <Avatar user={state.review.user} size={40} link={true}/>
                </div>
                <div className="ml-3 d-flex justify-content-between w-100">
                    <div>
                        <Typography variant="body1" style={{lineHeight: 1.25, display:'inline'}}>
                            <strong>
                                <Link style={{color: 'inherit'}} to={"/u/" + state.review.user.username}>{state.review.user.profile && state.review.user.profile.display_name ? state.review.user.profile.display_name : state.review.user.username}</Link>
                            </strong>
                        </Typography> <Typography variant="caption">
                            reviewed <strong><Link to={'/bots/' + state.review?.bot?.slug}>{state.review?.bot?.name}</Link></strong>
                        </Typography>
                        <div className="d-flex align-items-center">
                            <Typography variant="caption">
                                {moment.utc(state.review.createdAt).tz( moment.tz.guess() ).fromNow()} <span className="mx-1">&ndash;</span>
                            </Typography>
                            <Rating size="small" precision={1} value={state.review.rating?.score} readOnly />
                        </div>
                    </div>
                    <div>
                        {
                            (redux.app.loggedin && state.review.user._id === redux.app.user._id) && (
                                <>
                                    <IconButton 
                                        size="small" 
                                        onClick={handleClick}
                                        >
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem 
                                            onClick={() => {
                                                handleClose();
                                                dispatch({ type: 'TOGGLE_EDIT', payload: !state.edit});
                                            }}
                                        >
                                            Edit
                                        </MenuItem>
                                    </Menu>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;

