import React from "react";
import { NavLink } from 'react-router-dom';
import {Typography,IconButton} from '@material-ui/core';
import BotForm from '../../Bot/BotForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function EditBot(props) {

    return (
        <div className="row">
            <div className="col-md-10 col-12">
                <Typography 
                    variant="h5"
                    className="mb-2"
                >
                    <IconButton 
                        style={{marginLeft:'-7px'}}
                        aria-label="Go back" 
                        size="small"
                        component={ForwardNavLink}
                        to="/settings/bots/"
                        >
                        <ArrowBackIcon />
                    </IconButton>
                    <strong className="ml-2">Edit Bot</strong>
                </Typography>
            </div>
            <div className="col-md-10 col-12">
                <BotForm {...props} mode={"edit"}/>
            </div>
        </div>
    )

}
