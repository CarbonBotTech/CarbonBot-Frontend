import React, { useEffect, useState, Fragment } from "react";
import { updateProfile } from './../helpers/manageUser';
import { updateProfile as updateProfileAction } from './../store/actions/app.js';
import { useSelector, useDispatch } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import Avatar from './../components/Avatar';
import {Button,Typography,TextField} from '@material-ui/core';
import Uploader from './../components/Uploader';
import { useForm, Controller } from "react-hook-form";

export default function Profile(props) {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // redux
    const app = useSelector(state => state.app);
    const dispatch = useDispatch();

    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles

    useEffect(() => {
        setLoaded(true);
        if(app.user.profile) {
            setValue("display_name", app.user.profile.display_name);
            setValue("about", app.user.profile.about);
            setValue("facebook", app.user.profile.facebook);
            setValue("twitter", app.user.profile.twitter);
            setValue("linkedin", app.user.profile.linkedin);
            setValue("website", app.user.profile.website);
        }
    },[])

    // methods

    const handleProfileUpdate = async (form) => {
        setSubmitting(true);
        setErrorVisibile(false);
        const [error, response] = await updateProfile(app.user._id,app.token,form);
        setSubmitting(false);
        if(error) {
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your profile has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        dispatch( updateProfileAction(response.data) );
    }


    const avatarUploaded = (response) => {
        enqueueSnackbar('Success! Your avatar has been uploaded.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        dispatch( updateProfileAction(response) );
    }

    return (
        <Fragment>

            <Typography 
                variant="h5"
                className="mb-2"
            >
                <strong>Profile</strong>
            </Typography>

            <div className="row">
                <div className="col-md-10 col-12">

                    {
                        is_error_visible ? <Error error={error} /> : null
                    }

                    <Typography 
                        variant="subtitle1"
                        className="mb-2"
                    >
                        Avatar
                    </Typography>

                    <div className="d-flex mb-3 align-items-center">
                        <Avatar 
                            user={app.user} 
                            size={100}
                        />
                        <div className="ml-3">
                            {
                                loaded && <Uploader
                                    url={`profiles/${app.user._id}/avatar`}
                                    callback={avatarUploaded}
                                    aspectRatio={1}
                                    destination="avatar"
                                />
                            }
                        </div>
                    </div>
                        
                    <Typography 
                        variant="subtitle1"
                        className="mb-2"
                    >
                        Info
                    </Typography>

                    <form onSubmit={handleSubmit(handleProfileUpdate)}> 
                        <Controller
                            as={
                                <TextField 
                                    label="Display Name"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.display_name && true}
                                    helperText={
                                        errors?.display_name?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 30}
                                    }
                                />
                            }
                            name="display_name"
                            control={control}
                            defaultValue={""}
                        />
                        <Controller
                            as={
                                <TextField 
                                    label="Website"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.website && true}
                                    helperText={
                                        errors?.website?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 120}
                                    }
                                />
                            }
                            name="website"
                            control={control}
                            defaultValue={""}
                        />
                        <Controller
                            as={
                                <TextField 
                                    label="Twitter"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.twitter && true}
                                    helperText={
                                        errors?.twitter?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 120}
                                    }
                                />
                            }
                            name="twitter"
                            control={control}
                            defaultValue={""}
                        />
                        <Controller
                            as={
                                <TextField 
                                    label="Facebook"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.facebook && true}
                                    helperText={
                                        errors?.facebook?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 120}
                                    }
                                />
                            }
                            name="facebook"
                            control={control}
                            defaultValue={""}
                        />
                        <Controller
                            as={
                                <TextField 
                                    label="Linkedin"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.linkedin && true}
                                    helperText={
                                        errors?.linkedin?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 120}
                                    }
                                />
                            }
                            name="linkedin"
                            control={control}
                            defaultValue={""}
                        />
                        <Controller
                            as={
                                <TextField 
                                    label="About"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.about && true}
                                    helperText={
                                        errors?.about?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 300}
                                    }
                                    multiline
                                    rows={4}
                                />
                            }
                            name="about"
                            control={control}
                            defaultValue={""}
                        />
                        <Button 
                            disabled={submitting}
                            size="large" 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            >Save
                        </Button>
                    </form>
                </div>
            </div>

        </Fragment>
    )

}
