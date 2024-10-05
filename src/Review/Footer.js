import React, { useEffect, useState, useContext } from "react";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { upvoteReview } from './../helpers/manageReviews';
import { useSnackbar } from 'notistack';
import { AppContext } from './Review'

const Footer = () => {

    // context
    const {state, dispatch} = useContext(AppContext);
    
    // state
    const [has_voted, setVoted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // redux
    const app = useSelector(state => state.app);

    // misc hooks
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    /**
     * Highlight the upvote button if the current user has already voted
     */
    useEffect(() => {
        if(app.loggedin) {
            let find_vote = state.review.upvotes.find(vote => vote === app.user.id);
            if(find_vote) {
                setVoted(true);
            } else {
                setVoted(false);
            }
        }
    },[state.review.upvotes]);

    // methods
    const handleUpvote = async (id) => {
        if(!app.loggedin) {
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
        const [error, response] = await upvoteReview(app.token,id);
        setSubmitting(false);
        if(error) {
            return;
        }
        setVoted(true);
        dispatch({ type: 'SET_REVIEW', payload: {
            ...state.review,
            upvotes: response.data?.upvotes?.map((voter) => voter._id) // reduce object to just arrays of IDs
        }});
    }

    return (
        <div className="footer px-3">
            <div className="d-flex align-items-center">
                <Button
                    size="small"
                    disabled={submitting}
                    variant="outlined"
                    color={has_voted ? 'secondary' : 'default'}
                    onClick={() => handleUpvote(state.review._id)}
                    startIcon={<ThumbUpAltOutlinedIcon />}
                >
                    Helpful
                </Button>    
                <div className="mx-2">
                    <Typography variant="caption"><strong>{state.review.upvotes.length}</strong> people found this helpful.</Typography>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;

