import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { forgotPassword } from './../helpers/manageUser';
import { parseErrors } from './../helpers/parseErrors';
import Error from './../components/Error';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from "react-hook-form";

export default function Forgot() {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // misc hooks
    const { handleSubmit, setValue, control, errors } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // methods
    const handleForgotSubmit = async (form) => {

        setSubmitting(true);
        setErrorVisibile(false);

        const [error, response] = await forgotPassword(form.email);
        setSubmitting(false);

        if(error) {   
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }

        enqueueSnackbar('Success! Check your email and follow the instruction to reset your password.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setValue('email','');
    }

    return (
        <div className="container h-100">
           <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-12">
                    {
                        is_error_visible ? <Error error={error} /> : null
                    }
                    <Typography variant="h5" className="mb-3">
                        Forgot your password?
                    </Typography>
                    <form onSubmit={handleSubmit(handleForgotSubmit)}> 
                        <Controller
                            as={
                                <TextField 
                                    label="E-mail"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.email && true}
                                    helperText={
                                        errors?.email?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 30}
                                    }
                                />
                            }
                            name="email"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                required: "This field is required.",
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                    message: 'Please enter a valid email address.'
                                }
                            }}
                        />
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <Button 
                                    disabled={submitting}
                                    size="large" 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit">Submit</Button>
                            </div>
                            <div>
                                <Link to="/login">No, I am good</Link>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
       </div>
    )

}
