import React, { Fragment, memo, useState, useReducer, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './../sass/Post.scss';
import { Alert, AlertTitle } from '@material-ui/lab';
import Comments from './../Comments';

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
    edit: false,
    post: null,
    user: null,
    comments_on: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_EDIT':
            return {
                ...state,
                edit: action.payload
            };
        case 'SET_POST':
            return {
                ...state,
                post: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'TOGGLE_COMMENTS':
            return {
                ...state,
                comments_on: action.payload
            };
        default:
            return initialState;
    }
}

const Post = (props) => {

    const [state, dispatch] = useReducer(reducer, {
        edit: false,
        post: props.post,
        comments_on: props.direct ? true : false
    });

    if(!props.post) return null;

    if(!state.post?.approved) {
        return (
            <Alert severity="info" className="mb-3">
                <AlertTitle>Removed!</AlertTitle>
                This post has been unpublished.
            </Alert>
        )
    }

    return (
        <Fragment>
            <Paper variant="outlined" className="mb-3 post">
                <AppContext.Provider value={{ state, dispatch }}>
                    <Header {...props}/>
                    <Content preview={props.direct ? true : false}/>
                    <Footer/>
                </AppContext.Provider>
                { state.comments_on && <Comments post_id={state.post?._id}/> }
            </Paper>
        </Fragment>
    )
}

export default memo(Post);

