import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { signUp } from './../helpers/manageUser';
import { parseErrors } from './../helpers/parseErrors';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import { useForm, Controller } from "react-hook-form";

export default function Signup(props) {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // misc hooks
    const { handleSubmit, watch, control, errors } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // methods

    const handleUserSignup = async (form) => {

        setSubmitting(true);
        setErrorVisibile(false);

        const [error, response] = await signUp(form.username,form.email,form.password);
        setSubmitting(false);

        if(error) {   
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }

        enqueueSnackbar('Congratulations! Your registration has been successfully completed.', { 
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit(handleUserSignup)}> 
                        <Controller
                            as={
                                <TextField 
                                    label="Username"
                                    autoComplete="new-password"
                                    fullWidth={true}
                                    variant="outlined"
                                    error={errors.username && true}
                                    helperText={
                                        errors?.username?.message
                                    }
                                    className="mb-3"
                                    inputProps={
                                        {maxLength: 30}
                                    }
                                />
                            }
                            name="username"
                            control={control}
                            defaultValue={""}
                            rules={{ 
                                required: "This field is required.",
                                minLength: {
                                    value: 3,
                                    message: "Username must have at least 3 characters."
                                },
                                pattern: {
                                    value: /^[a-z0-9]+$/i,
                                    message: 'Username must contain only letters and numbers.'
                                }
                            }}
                        />
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
                        <Controller
                            as={
                                <TextField 
                                    type="password"
                                    label="Password"
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
                                    label="Confirm Password"
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
                                <Link to="/login">Already have an account?</Link>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
       </div>
    )

}
