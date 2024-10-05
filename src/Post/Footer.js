import React, { useEffect, useState, useContext, Fragment } from "react";
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { castVote } from './../helpers/manageCommunity';
import { parseErrors } from './../helpers/parseErrors';
import { useSnackbar } from 'notistack';
import { AppContext } from './index'
import CommentIcon from '@material-ui/icons/Comment';

const Footer = () => {

    // context
    const {state, dispatch} = useContext(AppContext);
    
    // state
    const [submitting, setSubmitting] = useState(false);
    const [has_upvoted, setUpvoted] = useState(false);
    const [has_downvoted, setDownvoted] = useState(false);
    const [upvotes, setUpvotes] = useState(state.post.upvotes);
    const [downvotes, setDownvotes] = useState(state.post.downvotes);

    // redux
    const redux = useSelector(state => state);

    // hooks
    const { enqueueSnackbar } = useSnackbar();
    
    // methods

    const handleVote = async (weight) => {
        if(!redux.app.loggedin) {
            enqueueSnackbar('Attention! You need to be loggedin to vote.', { 
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            return;
        }
        setSubmitting(true);
        const [error, response] = await castVote(redux.app.token, state.post.id, weight);
        if(error) {
            const errors = parseErrors(error.response);
            enqueueSnackbar(errors[0]['message'] , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            return;
        }
        setUpvotes(response.data?.upvotes)
        setDownvotes(response.data?.downvotes)
        setSubmitting(false);
    }

    const toggleComments = () => {
        dispatch({ type: 'TOGGLE_COMMENTS', payload: !state.comments_on});
    }

    // lifecycles
    useEffect(() => {
        if(redux.app.loggedin) {
            let find_downvote = downvotes?.find(upvote => upvote === redux.app.user.id);
            let find_upvote = upvotes?.find(downvote => downvote === redux.app.user.id);

            if(find_upvote) {
                setUpvoted(true);
            }
            if(find_downvote) {
                setDownvoted(true);
            }
            if(find_upvote && !find_downvote) {
                setUpvoted(true);
                setDownvoted(false);
            }
            if(!find_upvote && find_downvote) {
                setUpvoted(false);
                setDownvoted(true);
            }
            if(!find_downvote && !find_upvote) {
                setUpvoted(false);
                setDownvoted(false);
            }
        }
    },[upvotes,downvotes]);

    return (
        <Fragment>
            <div className="footer px-3 d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                    <IconButton color={has_upvoted ? 'secondary' : 'default'} disabled={submitting} aria-label="upvote" size="small" onClick={() => handleVote(1)}>
                        <ThumbUpAltOutlinedIcon className="vote-icon" />
                    </IconButton>
                    <div className="ml-1 mr-3">
                        <Typography variant="caption"><strong>{upvotes.length}</strong></Typography>
                    </div>
                    <IconButton color={has_downvoted ? 'primary' : 'default'}  disabled={submitting} aria-label="downvote" size="small" onClick={() => handleVote(-1)}>
                        <ThumbDownAltOutlinedIcon className="vote-icon" />
                    </IconButton>
                    <div className="mx-1">
                        <Typography variant="caption"><strong>{downvotes.length}</strong></Typography>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <IconButton color={has_downvoted ? 'primary' : 'default'}  disabled={submitting} aria-label="downvote" size="small" onClick={() => toggleComments()}>
                        <CommentIcon style={{ color: '#888', fontSize: '20px' }}/>
                    </IconButton>
                    <div className="ml-1">
                        <Typography variant="caption"><strong>{state.post.comment_counter}</strong></Typography>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;