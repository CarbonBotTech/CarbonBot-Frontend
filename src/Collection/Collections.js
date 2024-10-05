import React, { Fragment } from "react";
import { NavLink, Link } from 'react-router-dom';
import { 
    Breadcrumbs, 
    Typography,
    Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CollectionList } from './../Collection';
import { useSelector } from 'react-redux';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Collections() {
    
    // redux
    const redux = useSelector(state => state);

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
                            Collections
                        </Typography>
                    </div>
                    {
                        redux.app.loggedin && (
                            <div className="col-md-3 col-12 text-md-right">
                                <Button size="small" color="primary" component={ForwardNavLink} to={'/settings/collections/new'}>
                                    Create New Collection
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="col-md-8 col-12">
                <CollectionList
                    query={{ '_start': 0, '_limit': 15, '_sort': 'upvote_counter:desc', 'bot_counter_gte': 1 }}
                    mode="presentation"
                />
            </div>
        </Fragment>
    )
}