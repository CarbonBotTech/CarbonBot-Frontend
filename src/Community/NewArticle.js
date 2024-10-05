import React, { useEffect, useReducer, forwardRef, Fragment, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { 
    Breadcrumbs, 
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import Editor from '../components/Editor';


export default function NewArticle(props) {

    // methods
    const articleAdded = () => {
        props.history.push('/community');
    }
     
    return (
        <div className="col-md-10 col-12">
            <div className="note-editor-form">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    <Link color="inherit" to="/community">Community</Link>
                </Breadcrumbs>
                <Typography variant="h4" className="mt-1 mb-3">
                    New Article
                </Typography>
                <Editor
                    data={[]}
                    callback={(new_article) => articleAdded(new_article)}
                    mode="new"
                />
            </div>
        </div>
    )

}
