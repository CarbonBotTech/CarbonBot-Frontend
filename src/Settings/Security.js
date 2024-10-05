import React, { useEffect, useState, Fragment } from "react";
import { Typography } from '@material-ui/core';
import { changePassword } from './../helpers/manageUser';
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import {Button,TextField} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";

export default function Security() {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // redux
    const app = useSelector(state => state.app);

    // misc hooks
    const { handleSubmit, watch, control, setValue, errors } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // methods

    const handleChangePassword = async (form) => {
        setSubmitting(true);
        const [error, response] = await changePassword(app.user._id,app.token,form.password);
        setSubmitting(false);
        if(error) {
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar('Success! Your password has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue('password','');
        setValue('confirm_password','');
    }

    return (
        <Fragment>

            <Typography variant="h5">
                <strong>Security</strong>
            </Typography>

            <div className="row mt-3">
                <div className="col-md-10 col-12">
                    {
                        is_error_visible ? <Error error={error} /> : null
                    }

                    <form onSubmit={handleSubmit(handleChangePassword)}> 
                        <Controller
                            as={
                                <TextField 
                                    type="password"
                                    label="New Password"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.password && true}
                                    helperText={
                                        errors?.password?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 30}
                                    }
                                />
                            }
                            name="password"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                required: "This field is required.",
                                minLength: {
                                    value: 5,
                                    message: "Password must have at least 5 characters."
                                }
                            }}
                        />
                        <Controller
                            as={
                                <TextField 
                                    type="password"
                                    label="Confirm New Password"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.confirm_password && true}
                                    helperText={
                                        errors?.confirm_password?.message
                                    }
                                    className="mb-3"
                                />
                            }
                            name="confirm_password"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                validate: (value) => {
                                    return value === watch('password') || "Your passwords must match."
                                }
                            }}
                        />
                        <Button 
                            disabled={submitting}
                            size="large" 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            >Update
                        </Button>
                    </form>
                </div>
            </div>
            
        </Fragment>
    )

}
