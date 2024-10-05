import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import {Typography,IconButton} from '@material-ui/core';
import BotForm from '../../Bot/BotForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function NewBot(props) {

    return (
        <Fragment>

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
                            onClick={() => props.history.push('/settings/bots')}
                            >
                            <ArrowBackIcon />
                        </IconButton>
                        <strong className="ml-2">Add New Bot</strong>
                    </Typography>
                </div>
                <div className="col-md-10 col-12">
                    <BotForm {...props} mode={"new"}/>
                </div>
            </div>

        </Fragment>
    )

}
