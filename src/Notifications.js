import React, { Fragment } from "react";
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { 
    Breadcrumbs, 
    Typography,
    Button
} from '@material-ui/core';
import { markAllAsRead } from './helpers/manageNotifications';
import NotificationList from './components/NotificationList';
import { MarkAsRead } from './store/actions/notifications.js';

export default function Notifications(props) {
    
    // redux
    const redux = useSelector(state => state);
    const dispatch = useDispatch();

    // methods
    const handleMarkAllAsRead = async() => {
        dispatch(MarkAsRead());
        const [error,response] = await markAllAsRead(redux.app.token);
    }

    if(!redux.app.loggedin) {
        return <Redirect to="/"/>
    }

    return (
        <Fragment>
            <div className="col-md-8 col-12 mb-3">
                <div className="row align-items-end">
                    <div className="col-md-9 col-12">
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link color="inherit" to="/">
                                Home
                            </Link>
                        </Breadcrumbs>
                        <Typography variant="h4" className="mt-1">
                            Notifications
                        </Typography>
                    </div>
                    <div className="col-md-3 col-12 text-md-right">
                        <Button size="small" color="primary" onClick={() => handleMarkAllAsRead()}>
                            Mark all as Read
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-md-8 col-12">
                <NotificationList query={{ '_sort': 'createdAt:desc' }}/>
            </div>
        </Fragment>
        
    )

}