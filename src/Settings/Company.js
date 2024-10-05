import React, { useEffect, useState, Fragment } from "react";
import { updateCompany as updateCompanyAction } from './../store/actions/app.js';
import { createCompany, updateCompany } from './../helpers/manageCompany';
import { useSelector, useDispatch } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { countryToFlag } from './../helpers/countryToFlag';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import {Button,Typography,TextField} from '@material-ui/core';
import countries from './../assets/countries.json';
import AutoComplete from './../components/forms/AutoComplete';
import { useForm, Controller } from "react-hook-form";
import Uploader from './../components/Uploader';
import Poster from './../components/Poster';
import Avatar from './../components/Avatar';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function ManageCompanyForm({mode}) {

    // redux
    const app = useSelector(state => state.app);
    const dispatch = useDispatch();

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // misc hooks
    const { control, handleSubmit, errors, setValue } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    /**
     * Populate form with company's data if available
     */
    useEffect(() => {
        setLoaded(true);
        if(app.user.company) {
            for (let key in app.user.company) {
                if(key === 'country') {
                    // Find full country object based on the country code
                    let find_country = countries.find(country => country.code === app.user.company[key]);
                    if(find_country) {
                        setValue(key, find_country);
                    } else {
                        setValue(key, "");
                    }
                } else {
                    setValue(key, app.user.company[key]);
                }
                
            }
        }
    },[]);

    // methods
    const onSubmit = async (form) => {
        setSubmitting(true);
        setErrorVisibile(false);
        let payload = {
            ...form,
            country: form.country.code
        };

        let error, response

        if(app.user.company) {
            [error, response] = await updateCompany(app.token, payload, app.user.company._id);
        } else {
            [error, response] = await createCompany(app.token, payload);
        }
        
        
        setSubmitting(false);
        if(error) {
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }

        enqueueSnackbar('Success! Your company profile has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        dispatch( updateCompanyAction(response.data) );
        
    };

    const posterUploaded = (response) => {
        enqueueSnackbar("Success! Your company's poster has been uploaded.", { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        dispatch( updateCompanyAction(response) );
    }

    const logoUploaded = (response) => {
        enqueueSnackbar("Success! Your company's logo has been uploaded.", { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        dispatch( updateCompanyAction(response) );
    }

    return (
        <Fragment>

            <div className="row">
                <div className="col-md-10 col-12">
                    <Typography 
                        variant="h5"
                        className="mb-2"
                    >
                        <strong>Company</strong>
                    </Typography>

                    {
                        is_error_visible ? <Error error={error} /> : null
                    }
                    
                    {
                        !app.user.company && 
                            <Fragment>
                                <Alert severity="info" className="mb-3">
                                    <AlertTitle>Attention</AlertTitle>
                                    You don't have a company profile yet. Fill out the form bellow to get started!
                                </Alert>
                            </Fragment>
                    } 

                    {
                        app.user.company &&
                        <Fragment>
                            <Typography 
                                variant="subtitle1"
                                className="mb-2"
                            >
                                Logo
                            </Typography>
                            <div className="d-flex mb-4 align-items-center">
                                <div className="mr-3">
                                    <Avatar 
                                        company={app.user.company} 
                                        size={100}
                                    />
                                </div>
                                {
                                    loaded && <Uploader
                                        url={`companies/${app.user.company?._id}/upload`}
                                        callback={logoUploaded}
                                        aspectRatio={1}
                                        destination="logo"
                                    />
                                }
                            </div>
                            <Typography 
                                variant="subtitle1"
                                className="mb-2"
                            >
                                Poster
                            </Typography>
                            <Poster src={app.user.company?.poster}>
                                {
                                    loaded && <Uploader
                                        url={`companies/${app.user.company?._id}/upload`}
                                        callback={posterUploaded}
                                        aspectRatio={16 / 9}
                                        destination="poster"
                                    />
                                }
                            </Poster>
                        </Fragment>
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
                                    label="Company Name *"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.name && true}
                                    helperText={
                                        errors?.name?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 30}
                                    }
                                />
                            }
                            name="name"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                required: "This field is required.", 
                                maxLength: {
                                    value: 30,
                                    message: "This field cannot be longer than 30 characters."
                                } 
                            }}
                        />

                        <Controller
                            as={
                                <TextField 
                                    label="Tagline"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.tagline && true}
                                    helperText={
                                        errors?.tagline?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 190}
                                    }
                                    helperText="Optional. Briefly describe your company. 190 charachters max."
                                />
                            }
                            name="tagline"
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
                                    label="Address Line 1 *"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.address_1 && true}
                                    helperText={
                                        errors?.address_1?.message ? errors?.address_1?.message : "Street address, P.O. box, c/o"
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 50}
                                    }
                                />
                            }
                            name="address_1"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                required: "This field is required."
                            }}
                        />  

                        <Controller
                            as={
                                <TextField 
                                    label="Address Line 2"
                                    fullWidth={true}
                                    variant="outlined"
                                    autoComplete="new-password"
                                    error={errors.address_2 && true}
                                    helperText="Suite, appartment, unit, building, floor, etc."
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 50}
                                    }
                                />
                            }
                            defaultValue={""}
                            control={control}
                            name="address_2"
                        />  

                        <div className="row">
                            <div className="col-md-4 col-12">
                                <Controller
                                    as={
                                        <TextField 
                                            label="City *"
                                            fullWidth={true}
                                            variant="outlined"
                                            autoComplete="new-password"
                                            error={errors.city && true}
                                            helperText={
                                                errors?.city?.message
                                            }
                                            className="mb-3"
                                            inputProps={
                                                {maxLength: 55}
                                            }
                                        />
                                    }
                                    name="city"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ 
                                        required: "This field is required."
                                    }}
                                />
                            </div>

                            <div className="col-md-4 col-12">
                                <Controller
                                    as={
                                        <TextField 
                                            label="State / Province"
                                            fullWidth={true}
                                            variant="outlined"
                                            autoComplete="new-password"
                                            error={errors.state && true}
                                            helperText={
                                                errors?.state?.message
                                            }
                                            className="mb-3"
                                            inputProps={
                                                {maxLength: 30}
                                            }
                                        />
                                    }
                                    name="state"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ 
                                        required: "This field is required."
                                    }}
                                />
                            </div>

                            <div className="col-md-4 col-12">
                                <Controller
                                    as={
                                        <TextField 
                                            label="ZIP / Postal Code *"
                                            fullWidth={true}
                                            variant="outlined"
                                            autoComplete="new-password"
                                            error={errors.zip && true}
                                            helperText={
                                                errors?.zip?.message
                                            }
                                            className="mb-3"
                                            inputProps={
                                                {maxLength: 10}
                                            }
                                        />
                                    }
                                    name="zip"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ 
                                        required: "This field is required."
                                    }}
                                />
                            </div>
                        </div>      

                        <AutoComplete
                            control={control}
                            name="country"
                            options={countries}
                            getOptionLabel={(option) => option.label}
                            renderOption={(option) => (
                                <span>
                                    {countryToFlag(option.code)} {option.label}
                                </span>
                            )}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth={true}
                                        label="Country *" 
                                        variant="outlined"
                                        autoComplete="new-password"
                                        error={errors.country && true}
                                        helperText={
                                            errors?.country?.message
                                        }
                                        className="mb-3"
                                    />
                                )
                            }}
                            defaultValue={null}
                            rules={{
                                required: "This field is required."
                            }}
                        />
                        <Button 
                            disabled={submitting}
                            className="mb-3"
                            size="large" 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            >Submit
                        </Button>
                    </form>
                </div>
            </div>

        </Fragment>
    )

}
