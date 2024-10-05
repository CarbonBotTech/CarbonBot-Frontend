import React, { Fragment, useState, useEffect, useContext } from "react";
import { postReply } from './../helpers/manageComments';
import { parseErrors } from './../helpers/parseErrors';
import {Button,Typography,TextField} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import Error from './../components/Error';

const ReplyForm = ({comment,callback}) => {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // redux
    const redux = useSelector(state => state);

    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    
    // lifecycle
    useEffect(()=> {

    },[]);

    // methods
    const handleSubmitReply = async(form) => {
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            post: comment.post,
            parent: comment.parent ? comment.parent : comment._id, // comment.parent - reply to reply, comment._id - reply to parent comment,
            content: form.content
        }
        if(comment.parent) {
            payload.target = comment._id;
        }
        const [error, response] = await postReply(redux.app.token,payload);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your reply has been published.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue("content",'');
        callback(response.data)
    }

    return (
        <div className="mt-2">
            {
                is_error_visible ? <Error error={error} /> : null
            }
            <form onSubmit={handleSubmit(handleSubmitReply)}> 
                <Controller
                    as={
                        <TextField 
                            label="Reply *"
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
                            rows={2}
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
                        size="small"
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
        </div>
    )
}

export default ReplyForm;