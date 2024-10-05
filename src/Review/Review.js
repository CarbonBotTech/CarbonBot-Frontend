import React, { Fragment, memo, useReducer } from "react";
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './../sass/Post.scss';

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
    review: null,
    edit: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_REVIEW':
            return {
                ...state,
                review: action.payload
            };
        case 'TOGGLE_EDIT':
            return {
                ...state,
                edit: action.payload
            };
        default:
            return initialState;
    }
}

const Post = (props) => {

    //context
    const [state, dispatch] = useReducer(reducer, {
        review: props.review
    });
    
    return (
        <Fragment>
            <Paper variant="outlined" className="mb-3 py-3 post">
                <AppContext.Provider value={{ state, dispatch }}>
                    <Header/>
                    <Content/>
                    <Footer/>
                </AppContext.Provider>
            </Paper>
        </Fragment>
    )
}

export default memo(Post);

