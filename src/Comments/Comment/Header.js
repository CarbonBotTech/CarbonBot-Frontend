import React, { Fragment, useState, useContext, useEffect } from "react";
import Avatar from './../../components/Avatar'
import { NavLink, Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from './index';
import { editReply, editComment } from './../../helpers/manageComments';
import { useSelector } from 'react-redux';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const Header = ({comment}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    // context
    const {state, dispatch} = useContext(AppContext);

    // redux
    const app = useSelector(state => state.app);

    // methods
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /*
    const enableEdit = () => {
        dispatch({ type: 'TOGGLE_EDIT', payload: !state.edit});
    }
    */
    const handleUnpublish = async () => {

        if(!comment.parent) {
            // editing comment, not reply
            const [error, response] = await editComment(app.token,comment._id,{approved: false});
            dispatch({ type: 'SET_COMMENT', payload: {
                ...state.comment,
                approved: false
            }});
        } else {
            const [error, response] = await editReply(app.token,comment._id,{approved: false});
            dispatch({ type: 'SET_COMMENT', payload: {
                ...state.comment,
                approved: false
            }});
        }
    
        
    }

    const ReplyTo = ({target}) => {
        return (
            <Typography variant="caption" className="ml-1">
                Replied to <strong>{target.user?.profile && target.user?.profile?.display_name ? target.user?.profile?.display_name : target.user?.username}</strong>
            </Typography>
        )
    }

    return (
        <Fragment>
            <div className="header d-flex align-items-center">
                <div>
                    <Avatar user={comment.user} size={35} link={true}/>
                </div>
                <div className="ml-3 d-flex justify-content-between w-100">
                    <div>
                        <Typography variant="body1" className="d-inline" style={{fontSize: '14px', lineHeight:1}}>
                            <strong>
                                <Link style={{color: 'inherit'}} to={"/u/" + comment.user.username}>{comment.user.profile && comment.user.profile.display_name ? comment.user.profile.display_name : comment.user.username}</Link>
                            </strong>
                        </Typography>
                        {
                            comment.target && <ReplyTo target={comment.target}/>
                        }
                        
                        <Typography variant="caption" className="d-block">
                            {moment.utc(comment.createdAt).tz( moment.tz.guess() ).fromNow()}
                        </Typography>
                    </div>
                    <div>
                        {
                            (app.loggedin && comment.user._id === app.user.id) && (
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
                                        {/*<MenuItem 
                                            onClick={() => {
                                                handleClose()
                                                enableEdit()
                                            }}
                                        >
                                            {state.edit ? 'Cancel' : 'Edit'}
                                        </MenuItem>*/}
                                        <MenuItem 
                                            style={{color:'#f44336'}}
                                            onClick={() => {
                                                handleClose()
                                                handleUnpublish()
                                            }}
                                        >
                                            Unpublish
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

