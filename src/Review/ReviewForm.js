import React, { Fragment, useState, useEffect } from "react";
import {Button,Typography,TextField,FormHelperText} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { postReview, getReviewById, updateReview } from './../helpers/manageReviews';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import Rating from '@material-ui/lab/Rating';

const ReviewForm = ({ callback, cancel, mode, review_id, bot_id, review}) => {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);
    const [score, setScore] = useState(null);

    // redux
    const app = useSelector(state => state.app);

    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    useEffect(() => {
        if(mode === "edit") handleGetReviewById(review_id);
    },[]);

    // methods
    /**
     * Decide how to process the form submit event
     * @param {object} form - fields of the form
     */
    const handleSubmitReview = (form) => {
        if(mode === "edit") {
            handleUpdateReview(form,review_id);
        } else {
            handlePostReview(form,bot_id);
        }
    }
    /**
     * Submit new review
     * @param {object} form - fields of the form
     * @param {string} bot_id - Bot ID
     */
    const handlePostReview = async(form,bot_id) => {
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            ...form,
            bot: bot_id
        }
        const [error, response] = await postReview(app.token,payload);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your review has been posted.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue("content",'');
        setValue("score", null);
        setScore(null);
        if(callback) {
            callback(response.data);
        }
    }
    /**
     * Get review by its ID
     * @param {string} id - ID of the review
     */
    const handleGetReviewById = async(id) => {
        const [error, response] = await getReviewById(id);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        setScore(response.data.rating.score);
        setValue("score", response.data.rating.score);
        setValue("content", response.data.content);
        
    }
    /**
     * Update review using its ID and form fields
     * @param {object} form - fields of the form
     * @param {*} id - ID of the review
     */
    const handleUpdateReview = async(form,id) => {
        setErrorVisibile(false);
        setSubmitting(true);
        const [error, response] = await updateReview(app.token, id, form);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your review has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        if(callback) {
            callback(response.data);
        }
    }

    const handleDeleteReview = async() => {

    }

    return (
        <Fragment>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            <form onSubmit={handleSubmit(handleSubmitReview)}> 
                <div className="mb-3 d-flex">
                    <Typography variant="body1" className="mr-3">
                        Rate this bot:
                    </Typography>
                    <div className="d-flex align-items-center">
                        <Controller
                            name="score"
                            control={control}
                            defaultValue={score}
                            rules={{ required: true }}
                            render={() => {
                                return (
                                    <Rating 
                                        name="score" 
                                        value={score} 
                                        readOnly={review || !app.loggedin ? true : false}
                                        onChange={
                                            (e, newValue) => { 
                                                setScore(newValue); 
                                                setValue("score",newValue) 
                                            }
                                        }
                                    />
                                )
                            }}
                        />
                        {
                            errors?.score && (
                                <FormHelperText error={true} className="ml-1 my-0">
                                    You must cast a vote
                                </FormHelperText>
                            )
                        }
                    </div>
                </div>
                <Controller
                    as={
                        <TextField 
                            label="Your Review"
                            fullWidth={true}
                            variant="outlined"
                            error={errors.content && true}
                            helperText={
                                errors?.content?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 3000}
                            }
                            multiline
                            rows={4}
                            disabled={review ? true : false}
                        />
                    }
                    name="content"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />  
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <Button 
                            disabled={submitting || !app.loggedin || review && true}
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            >{ mode === "edit" ? "Update" : "Submit"}
                        </Button>
                        {
                            mode === "edit" && (
                                <Button 
                                    className="ml-3"
                                    variant="outlined" 
                                    type="button"
                                    onClick={() => {
                                        if(cancel) cancel();
                                    }}
                                    >Cancel
                                </Button>
                            )
                        }
                    </div>
                    {
                        mode === 'edit' && (
                            <Button 
                                disabled={submitting}
                                variant="outlined"
                                onClick={() => handleDeleteReview()}
                                //style={{color:'#f44336'}}
                                type="button"
                                disabled={true}
                                >
                                    Delete
                            </Button>
                        )
                    }
                </div>

                {
                    !app.loggedin && (
                        <Typography variant="caption" className="mt-3">
                            You need to be logged in to leave a review.
                        </Typography>
                    )
                }
            </form>
        </Fragment>
    )
}

export default ReviewForm;