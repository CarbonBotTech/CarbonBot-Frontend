import React, { Fragment, useReducer } from "react";
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './../../sass/Post.scss';
import Comment from './';
import ReplyForm from './../ReplyForm';

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
    edit: false,
    reply: false,
    callback: null,
    comment: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_EDIT':
            return {
                ...state,
                edit: action.payload
            };
        case 'TOGGLE_REPLY':
            return {
                ...state,
                reply: action.payload
            };
        case 'SET_COMMENT':
            return {
                ...state,
                comment: action.payload
            };
        default:
            return initialState;
    }
}

const CommentComponent = ({comment,callback}) => {

    //context
    const [state, dispatch] = useReducer(reducer, {
        edit: false,
        reply: false,
        callback: (data) => { callback(data) },
        comment: comment // store it for reference
    });

    return (
        <Fragment>
            <div className={`post pb-0 mt-3`}>

                <AppContext.Provider value={{ state, dispatch }}>
                    <Header comment={comment}/>
                    <Content comment={comment}/>
                    <Footer comment={comment}/>
                    {
                        state.reply && (
                            <ReplyForm 
                                comment={comment} 
                                callback={(reply) => { state.callback(reply); dispatch({ type: 'TOGGLE_REPLY', payload: !state.reply}); }}
                            />)
                    }
                </AppContext.Provider>

                {
                    comment?.replies?.length > 0 && (
                        <div className={`ml-3 reply`}>
                            {
                                comment.replies.map((reply) => {
                                    return (
                                        <Fragment key={reply._id}>
                                            <Comment 
                                                comment={reply}
                                                callback={(reply) => state.callback(reply)}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default CommentComponent

