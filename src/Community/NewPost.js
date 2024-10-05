import React from "react";
import { 
    Breadcrumbs, 
    Typography
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import PostForm from './../Post/PostForm';

export default function NewPost(props) {

    // methods
    const postAdded = (post) => {
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
                    New Post
                </Typography>
                <PostForm
                    {...props}
                    mode="new"
                    callback={(new_post) => postAdded(new_post)}
                />
            </div>
        </div>
    )

}
