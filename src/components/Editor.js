import React, { useEffect, useState } from "react";
import config from './../config.js';
import { 
    Button,
    TextField
} from '@material-ui/core';
import axios from 'axios';
import './../sass/Editor.scss';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorList from '@editorjs/list';
//import LinkTool from '@editorjs/link';
import Delimiter from '@editorjs/delimiter'
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from "react-hook-form";
import { createPost, getPostById, editPost } from './../helpers/manageCommunity';
import { parseErrors } from './../helpers/parseErrors';
import Error from './Error';

let editor;
let content;

export default function Editor({post_id,mode,callback}) {

    // state
    const [ready, setReady] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // redux
    const redux = useSelector(state => state);

    // hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    useEffect(() => {
        if(mode === "edit") {            
            handleGetPostById(post_id);
        } else {
            initEditor([]);
        }
        return () => {
            editor.destroy();
        }
    },[]);

    // methods

    const handleGetPostById = async(id) => {
        const [error, response] = await getPostById(id);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        content = response.data.content;
        initEditor({
            blocks: content.blocks
        });
        setValue("title", response.data.title);        
    }

    const handleSubmitPost = (form) => {
        if(mode === "edit") {
            handleUpdatePost(form,post_id);
        } else {
            handleCreatePost(form);
        }
    }

    const handleCreatePost = async (form) => {
        const channel_slug = 'general';
        let find_channel = redux.channels.find(item => item.slug === channel_slug);
        if(!find_channel) {
            return;
        }
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            ...form,
            channel: find_channel._id,
            type: 'article',
            content: content
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
        callback(response.data);
    }

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
            type: 'article',
            content: content,
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

    const initEditor = (data) => {
        editor = new EditorJS({ 
            holder: 'editorjs', 
            data: data,
            tools: {
                header: {
                    class: Header,
                    config: {
                        placeholder: 'Header',
                        levels: [3],
                        defaultLevel: 3
                    }
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Start typing here...'
                    }
                },
                /*
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: 'https://gearimpact-server.herokuapp.com/api/content/linkparser'
                    }
                },
                */
                list: EditorList,
                delimiter: Delimiter,
                image: {
                    class: ImageTool,
                    config: {
                        types: "image/png, image/jpg",
                        multiple: false,
                        uploader: {
                            uploadByFile(file) {

                                let formData = new FormData();
                                formData.append('file', file);
                                formData.append('destination', 'article');

                                return axios.post(config.SERVER_URL + '/posts/upload', formData, {
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(response => {

                                    console.log("response", response)

                                    return {
                                        success: 1,
                                        file: {
                                            url: response.data
                                        }
                                    }

                                }).catch(err => {

                                    return {
                                        success: 1,
                                        file: {
                                            url: 'https://res.cloudinary.com/hrlhg3tzs/image/upload/v1573784083/other/error.jpg'
                                        }

                                    };
                                    
                                });
                            }
                        }
                    }
                },
            },
            initialBlock: 'paragraph',
            onReady: () => {
                setReady(true)
            },
            onChange: async () => {
                let saved_data = await editor.save();
                content = saved_data;
            }
        });

    }

    return (
        <form onSubmit={handleSubmit(handleSubmitPost)}>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            <Controller
                as={
                    <TextField 
                        label="Title"
                        autoFocus={false}
                        fullWidth={true}
                        variant="outlined"
                        error={errors.title && true}
                        helperText={
                            errors?.title?.message
                        }
                        className="mb-3"
                        inputProps={
                            {maxLength: 300}
                        }
                    />
                }
                name="title"
                control={control}
                defaultValue={""}
                rules={{ 
                    required: "This field is required." 
                }}
            />
            
            <div 
                className="note-editor mb-3"
                holder="editorjs"
                id="editorjs">
            </div>
            {
                ready && (
                    <Button variant="contained" color="primary" type='submit' disabled={submitting}>
                        {mode === 'new' ? 'Publish' : 'Update' } 
                    </Button>
                )
            }
        </form>
    )

}

