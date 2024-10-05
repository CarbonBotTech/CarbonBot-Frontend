import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { useHistory } from 'react-router-dom';
import { createCollection, updateCollection, getCollection, deleteCollection } from './../helpers/manageCollections';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import {Button,Typography,TextField,LinearProgress, Checkbox, FormControlLabel} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import Uploader from './../components/Uploader';
import Poster from './../components/Poster';

const CollectionForm = ({mode,id,callback}) => {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(mode === 'edit' ? true : false);
    
    // redux
    const app = useSelector(state => state.app);
    
    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    // lifecycles
    useEffect(() => {
        if(mode === "edit") {
            handleGetCollectionById(id);
        }
    },[]);

    // lifecycles
    useEffect(() => {
        
    },[]);

    // methods and services
    const handleGetCollectionById = async (id) => {
        const [error, response] = await getCollection("_id=" + id);
        setLoading(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        setCollection(response.data.collections[0]);
        setTimeout(() => {
            setValue("title",response.data.collections[0].title);
            setValue("about",response.data.collections[0].about);
            //setValue("private",response.data.collections[0].private);
        })
      
    }
    
    const onSubmit = async (form) => {

        setSubmitting(true);
        setErrorVisibile(false);

        let error, response;
        if(mode === "new") {
            [error, response] = await createCollection(app.token, form);
        } else {
            [error, response] = await updateCollection(app.token,form,id);
        }
        setSubmitting(false);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar(mode === 'new' ? 'Success! Your new collection has been created.' : 'Success! Your collection has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        if(callback) {
            response.data.user = app.user;
            callback(response.data);
        }
    }

    const posterUploaded = (response) => {
        enqueueSnackbar("Success! Your collection's poster has been uploaded.", { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setCollection(prevCollection => ({...prevCollection, poster: response.poster}));
    }

    const handleDeleteCollection = async() => {
        let confirmation = window.confirm("Are you sure?");
        if(confirmation) {
            setSubmitting(true);
            const [error, response] = await deleteCollection(app.token,id);
            setSubmitting(false);
            if(error) {
                const api_errors = parseErrors(error.response);
                setError(api_errors);
                setErrorVisibile(true);
                return;
            }
            enqueueSnackbar("Success! This collection has been deleted.", { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            history.push('/settings/collections');
        }
    }

    if(loading) {
        return (
            <LinearProgress color="secondary"/>
        )
    }

    return (
        <Fragment>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            
            {
                (mode === "edit" && collection) && (
                    <>
                        <Typography 
                            variant="subtitle1"
                            className="mb-2"
                        >
                            Poster
                        </Typography>
                        <Poster src={collection.poster}>
                            <Uploader
                                url={`collections/${id}/upload`}
                                callback={posterUploaded}
                                aspectRatio={16 / 9}
                                destination="poster"
                            />
                        </Poster>
                    </>
                )
            }
            
            <Typography 
                variant="subtitle1"
                className="mb-2"
            >
                Information
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <Controller
                    as={
                        <TextField 
                            label="Collection Name *"
                            autoComplete="new-password"
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
                <Controller
                    as={
                        <TextField 
                            label="Description"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.about && true}
                            helperText={
                                errors?.about?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 155}
                            }
                            multiline
                            rows={3}
                            helperText="Optional. Briefly describe your collection. 155 characters max."
                        />
                    }
                    name="about"
                    control={control}
                    defaultValue={""}
                />
                {/*
                <Controller
                    name="private"
                    control={control}
                    defaultValue={false}
                    render={props =>
                        <FormControlLabel
                            value="private"
                            className="mb-3"
                            control={<Checkbox
                                onChange={e => props.onChange(e.target.checked)}
                                checked={props.value}
                            />}
                            label="Make private?"
                            labelPlacement="end"
                        />
                    }
                />
                */}
                <div className="d-flex justify-content-between mb-3">
                    <Button 
                        disabled={submitting}
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        >{
                            mode === "edit" ? "Update" : "Create"
                        }
                    </Button>
                    {
                        mode === 'edit' && (
                            <Button 
                                disabled={submitting}
                                variant="outlined"
                                onClick={() => handleDeleteCollection()}
                                style={{color:'#f44336'}}
                                type="button"
                                >
                                    Delete
                            </Button>
                        )
                    }
                </div>
            </form>
        </Fragment>
    )

}

export default CollectionForm;