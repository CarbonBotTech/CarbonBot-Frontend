import React, { Fragment, useState, useEffect } from "react";
import {Button,Typography,TextField} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { postComment } from './../helpers/manageComments';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';

const CommentForm = ({ callback, post_id }) => {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // redux
    const redux = useSelector(state => state);

    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    useEffect(() => {

    },[]);
    
    // methods
    /**
     * Submit new comment
     * @param {object} form - fields of the form
     */
    const handleSubmitComment = async (form) => {
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            ...form,
            post: post_id
        }
        const [error, response] = await postComment(redux.app.token,payload);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your comment has been published.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue("content",'');
        callback(response.data);
    }

    return (
        <Fragment>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            <form onSubmit={handleSubmit(handleSubmitComment)}> 
                <Controller
                    as={
                        <TextField 
                            label="Comment *"
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
                            size="small"
                        />
                    }
                    name="content"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <div className="d-flex align-items-center mb-3">
                    <Button 
                        disabled={submitting || !redux.app.loggedin}
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        >Submit
                    </Button>
                    {
                        !redux.app.loggedin && (
                            <Typography variant="caption" className="ml-3">
                                You need to be logged in to write a new comment.
                            </Typography>
                        )
                    }
                </div>
            </form>
        </Fragment>
    )
}

export default CommentForm;