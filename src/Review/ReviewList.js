import React, { useEffect, Fragment, useState } from "react";
import { 
    LinearProgress,
    Paper,
    ListItemSecondaryAction,
    Divider,
    List, 
    ListItem, 
    ListItemText,
    Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import config from "./../config";
import Pagination from '@material-ui/lab/Pagination';
import { findReviews } from './../helpers/manageReviews';
import ReviewForm from './ReviewForm';
import Review from './Review';
import Rating from '@material-ui/lab/Rating';

export default function ReviewList(props) {
    
    // state
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current_user_review, setCurrentUserReview] = useState(null);
    const [pagination, setPagination] = useState({
        start: 0,
        current: 1,
        total: 0
    });

    // redux
    const redux = useSelector(state => state);

    // lifecycles
    useEffect(() => {
        if(redux.app.loggedin && props.mode === "presentation") {
            handleGetCurrentUserReview();
        }
        handleGetReviews(
            0,
            config.LIMIT
        );    
    },[]);

    // methods
    const handleGetReviews = async(start,limit) => {
        let query_object = {
            _start: start,
            _limit: limit
        }
        if(props.query) {
            query_object = {
                ...query_object,
                ...props.query
            }
        }
        
        let parsed_query = new URLSearchParams(query_object).toString();
        const [error, response] = await findReviews(parsed_query);
        if(error) return;
        setPagination({
            ...pagination,
            total: response.data.pages,
            current: response.data.current,
            start: start
        });
        setReviews(response.data.reviews);
        setLoading(false);
    }

    const handleGetCurrentUserReview = async () => {
        let query_object = {
            bot: props.query.bot,
            user: redux.app.user._id
        }
        let parsed_query = new URLSearchParams(query_object).toString();
        const [error, response] = await findReviews(parsed_query);
        if(error) {
            return
        }
        if(response.data.reviews.length > 0) {
            setCurrentUserReview(response.data.reviews[0]);
        }
    }

    const loadMore = (next) => {
        handleGetReviews(
            next,
            config.LIMIT,
            props.bot_id
        );
    }

    const handleAddReviewLocally = (data) => {
        let new_review = data.review;
        new_review.user.profile = redux.app.user.profile;
        setCurrentUserReview(new_review);
    }

    return (
        <Fragment>
            {
                current_user_review ? (
                    <Fragment>
                        <Alert severity="warning" className="my-3">Your review has been recieved.</Alert>
                        <Review review={current_user_review}/>
                    </Fragment>
                ) : (
                    <div className="mb-3">
                        {
                            props.mode === 'presentation' && (
                                <ReviewForm
                                    mode="new"
                                    bot_id={props.query.bot}
                                    callback={(data) => handleAddReviewLocally(data)}
                                />
                            )
                        }
                    </div>
                )
            }
            {
                reviews.length === 0 && !loading && (
                    <Alert severity="info" className="mt-3">
                        {
                            current_user_review ? 'No reviews from other users yet.' : 'No reviews yet.'
                        }   
                        
                    </Alert>
                )
            }
            {
                loading ? (
                    <LinearProgress color="secondary"/>
                ) : (
                    <Fragment>
                        {
                            props.mode === "presentation" ? (
                                <Fragment>
                                    {
                                        reviews.map((review) => (
                                            <Fragment key={review._id}>
                                                <Review review={review}/>
                                            </Fragment>
                                        ))
                                    }
                                </Fragment>
                            ) : (
                                <Paper>
                                    <List dense>
                                        {
                                            reviews.map((review,index) => {
                                                return (
                                                    <Fragment key={review._id}>
                                                        <ListItem
                                                            dense
                                                            button={true}
                                                            onClick={() => {
                                                                props.history.push('/settings/reviews/' + review._id)
                                                            }}
                                                        >
                                                            <ListItemText 
                                                                primary={
                                                                    <Typography variant="body1"><strong>{review.bot.name}</strong></Typography>
                                                                } 
                                                                secondary={
                                                                    <Typography variant="body2" className="preview-text">{review.content}</Typography>
                                                                }
                                                                disableTypography={true}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Rating
                                                                    readOnly={true}
                                                                    value={review.rating.score}
                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        { index < reviews.length - 1 && <Divider/> }
                                                        
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </List>
                                </Paper>
                            )
                        }
                        
                        <div className="d-flex justify-content-center my-3">
                            <Pagination 
                                count={pagination.total} 
                                color="primary" 
                                page={pagination.current} 
                                onChange={(e, next) => {

                                    let next_start = next * config.LIMIT - config.LIMIT
                                    loadMore( next_start )

                                }}/>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )

}
