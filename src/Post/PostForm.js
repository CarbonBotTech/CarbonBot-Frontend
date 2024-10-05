import React, { Fragment, useState, useEffect } from "react";
import { Button, TextField } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { createPost, getPostById, editPost } from './../helpers/manageCommunity';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';

const PostForm = (props) => {

    const { callback, mode, post_id } = props

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
        if(mode === "edit") handleGetPostById(post_id);
    },[]);

    // methods
    /**
     * Decide how to process the form submit event
     * @param {object} form - fields of the form
     */
    const handleSubmitPost = (form) => {
        if(mode === "edit") {
            handleUpdatePost(form,post_id);
        } else {
            handleCreatePost(form);
        }
    }
    /**
     * Submit new review
     * @param {object} form - fields of the form
     * @param {string} bot_id - Post ID
     */
    const handleCreatePost = async(form) => {
        const channel_slug = 'general'; //form.channel
        let find_channel = redux.channels.find(item => item.slug === channel_slug);
        if(!find_channel) {
            return;
        }
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            ...form,
            type: 'text',
            channel: find_channel._id
        }
        const [error, response] = await createPost(redux.app.token,payload);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your post has been published.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue("content",'');
        setValue("title",'');
        //setValue("channel",'');
        callback(response.data);
    }
    /**
     * Get post by its ID
     * @param {string} id - ID of the post
     */
    const handleGetPostById = async(id) => {
        const [error, response] = await getPostById(id);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        setValue("content", response.data.content.blocks[0]['data']['text']);
        setValue("title", response.data.title);        
    }
    /**
     * Update review using its ID and form fields
     * @param {object} form - fields of the form
     * @param {*} id - ID of the post
     */
    const handleUpdatePost = async(form,id) => {
        const channel_slug = 'general';
        let find_channel = redux.channels.find(item => item.slug === channel_slug);
        if(!find_channel) {
            return;
        }
        setErrorVisibile(false);
        setSubmitting(true);
        let payload = {
            ...form,
            type: 'text',
            channel: find_channel._id
        }
        const [error, response] = await editPost(redux.app.token, payload, id);
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your post has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        callback(response.data);
    }

    if(!redux.app.loggedin) return null;

    return (
        <Fragment>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            <form onSubmit={handleSubmit(handleSubmitPost)} className="mb-3"> 
                <Controller
                    as={
                        <TextField 
                            label="Title"
                            fullWidth={true}
                            variant="outlined"
                            //error={errors.content && true}
                            helperText={
                                errors?.title?.message
                            }
                            className="mb-3"
               
                            inputProps={
                                {maxLength: 300}
                            }
                            helperText={"Optional. 300 characters max."}
                        />
                    }
                    name="title"
                    control={control}
                    defaultValue={""}
                />
                <Controller
                    as={
                        <TextField 
                            label="Post *"
                            autoFocus={true}
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
                        />
                    }
                    name="content"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <div className="d-flex align-items-center justify-content-between">
                    <Button 
                        disabled={submitting || !redux.app.loggedin}
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        
                        >Submit
                    </Button>
                </div>
                
            </form>
            
        </Fragment>
    )
}

export default PostForm;