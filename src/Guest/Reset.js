import React, { useState } from "react";
import { Button, TextField, Typography } from '@material-ui/core';
import { resetPassword } from './../helpers/manageUser';
import { parseErrors } from './../helpers/parseErrors';
import Error from './../components/Error';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from "react-hook-form";

export default function Reset(props) {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // misc hooks
    const { handleSubmit, control, errors, watch } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const handleResetSubmit = async (form) => {

        setSubmitting(true);
        setErrorVisibile(false);

        const [error, response] = await resetPassword(props.match.params.code, form.password);
        setSubmitting(false);

        if(error) {   
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }

        enqueueSnackbar('Your password has been reset! You can now login.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });

        props.history.push('/login');

    }

    return (
        <div className="container h-100">
           <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-12">
                    {
                        is_error_visible ? <Error error={error} /> : null
                    }
                    <Typography variant="h5" className="mb-3">
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit(handleResetSubmit)}> 
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
                            type="submit">
                                Reset Password
                            </Button>
                    </form>
                </div>
           </div>
       </div>
    )

}
