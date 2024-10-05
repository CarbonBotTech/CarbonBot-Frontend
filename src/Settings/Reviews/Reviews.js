import React, { Fragment } from "react";
import {  Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ReviewList from '../../Review/ReviewList';

export default function Reviews(props) {

    // redux
    const redux = useSelector(state => state);

    return (
        <Fragment>

            <Typography 
                variant="h5"

            >
                <strong>My Reviews</strong>
            </Typography>

            <div className="row">
                <div className="col-md-10 col-12">
                    <ReviewList
                        query={{ _sort: 'createdAt:desc', user: redux.app.user._id }}
                        mode="edit"
                        {...props}
                    />
                </div>
            </div>

        </Fragment>
    )

}
