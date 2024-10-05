import React, { Fragment, forwardRef } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BotList from './../../Bot/BotList';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Bots(props) {

    // redux
    const app = useSelector(state => state.app);

    return (
        <Fragment>
            <Typography 
                variant="h5"
                className="mb-2"
            >
                <strong>My Bots</strong>
            </Typography>

            <div className="row">
                <div className="col-md-10 col-12">
                    <div className="mb-3">
                        <Button
                            variant="contained"
                            color="primary"
                            component={ForwardNavLink}
                            to="/settings/bots/new"
                        >
                            Add New Bot
                        </Button>
                    </div>
                </div>
                <div className="col-md-10 col-12">
                    <BotList
                        query={{ 'user': app.user._id, '_sort': 'createdAt:desc' }}
                        {...props}
                        mode="admin"
                    />
                </div>
            </div>

        </Fragment>
    )

}
