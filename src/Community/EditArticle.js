import React, { useEffect, useReducer, forwardRef, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    Breadcrumbs, 
    Typography
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import Editor from './../components/Editor';


export default function EditArticle(props) {

    // hooks
    const params = useParams();

    // methods
    const articleEdited = () => {
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
                    Edit Article
                </Typography>
                <Editor
                    post_id={params.post_id}
                    callback={() => articleEdited()}
                    mode="edit"
                />
            </div>
        </div>
    )

}
