import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Typography, Button, TextField } from '@material-ui/core';
import { loginUser } from './../helpers/manageUser';
import { parseErrors } from './../helpers/parseErrors';
import Error from './../components/Error';
import { setAuthToken, setUser } from './../store/actions/app.js';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";

export default function Login(props) {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setError] = useState([]);

    // misc hooks
    const { handleSubmit, setValue, control, errors } = useForm();

    // redux
	const dispatch = useDispatch();

    // methods
    const handleUserLogin = async (form) => {

        setSubmitting(true);
        setErrorVisibile(false);

        const [error, response] = await loginUser(form.email,form.password);
        setSubmitting(false);

        if(error) {   
            const errors = parseErrors(error.response);
            setError(errors);
            setErrorVisibile(true);
            return;
        }

        dispatch( setAuthToken(response.data.jwt) );
        dispatch( setUser(response.data.user) );

        props.history.push('/');

    }

    return (
        <div className="container h-100">
           <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-12">

                    {
                        is_error_visible ? <Error error={error} /> : null
                    }
                    <Typography variant="h5" className="mb-3">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit(handleUserLogin)}> 
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
                                required: "This field is required."
                            }}
                        />
                        <div className="row align-items-center">
                            <div className="col-md-4 col-12">
                                <Button 
                                    disabled={submitting}
                                    size="large" 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit">Login</Button>
                            </div>
                            <div className="col-md-8 col-12 text-md-right mt-3 mt-md-0">
                                <Link to="/signup">New account</Link><Link to="/forgot-password" className="ml-3">Forgot password?</Link>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
       </div>
    )

}
