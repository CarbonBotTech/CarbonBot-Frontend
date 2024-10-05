import React, { Fragment } from "react";
import { 
    Breadcrumbs, 
    Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import BotList from './Bot/BotList';

export default function Tag(props) {

    return (
        <Fragment>
            <div className="col-md-8 col-12 mb-3">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    <Typography color="textPrimary">Tags</Typography>
                </Breadcrumbs>
                <Typography variant="h4" className="mt-1">
                    #{props.match.params.tag}
                </Typography>
            </div>
            <div className="col-md-8 col-12">
                <BotList
                    {...props}
                    query={{ 'tags_contains': props.match.params.tag }}
                />
            </div>
        </Fragment>
    )

}
