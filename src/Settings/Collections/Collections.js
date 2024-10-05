import React, { Fragment, forwardRef } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CollectionList } from './../../Collection';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Collections(props) {

    // redux
    const app = useSelector(state => state.app);

    return (
        <Fragment>
            <Typography 
                variant="h5"
                className="mb-2"
            >
                <strong>My Collections</strong>
            </Typography>

            <div className="row">
                <div className="col-md-10 col-12">
                    <div className="mb-3">
                        <Button
                            variant="contained"
                            color="primary"
                            component={ForwardNavLink}
                            to="/settings/collections/new"
                        >
                            Create New Collection
                        </Button>
                    </div>
                </div>
                <div className="col-md-10 col-12">
                    <CollectionList
                        query={{ 'user': app.user._id, '_sort': 'createdAt:desc' }}
                        mode="edit"
                    />
                </div>
            </div>

        </Fragment>
    )

}
