import React from "react";
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default function AccountConfirmation(props) {

    return (
        <div className="container h-100">
           <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-12">
                    <Typography variant="h4" className="mb-3"><strong>Thank you!</strong></Typography>
                    <Typography variant="body1">
                        Your account has been confirmed. You may now <Link to='/login'>login</Link>.
                    </Typography>
                </div>
           </div>
       </div>
    )

}
