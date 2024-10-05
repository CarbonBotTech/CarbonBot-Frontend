import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import {Typography,IconButton} from '@material-ui/core';
import { CollectionForm } from './../../Collection';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function NewCollection(props) {

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
                            onClick={() => props.history.push('/settings/collections')}
                            >
                            <ArrowBackIcon />
                        </IconButton>
                        <strong className="ml-2">Create New Collection</strong>
                    </Typography>
                </div>
                <div className="col-md-10 col-12">
                    <CollectionForm 
                        {...props} 
                        mode={"new"}
                        callback={(new_collection) => {
                            props.history.push('/settings/collections/' + new_collection._id);
                        }}
                    />
                </div>
            </div>

        </Fragment>
    )

}
