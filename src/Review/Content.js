import React, { useContext } from "react";
import { Typography } from '@material-ui/core';
import { AppContext } from './Review';
import Linkify from 'linkifyjs/react';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const Content = ({content}) => {

    // context
    const {state, dispatch} = useContext(AppContext);

    // methods
    const onEdited = (updated_review) => {
        dispatch({ type: 'TOGGLE_EDIT', payload: !state.edit});
        dispatch({ type: 'SET_REVIEW', payload: {
            ...state.review,
            content: updated_review.content,
            rating: updated_review.rating,
            bot: updated_review.bot
        }});
    }

    const prepHashrags = (value, type) => {

        let text;
        if(type == 'hashtag') {
            text = <Link to={'/tags/' + value.replace('#','')}>{value}</Link>
        } else if(type == 'url' && value.length > 140) {
            text = value.slice(0, 140) + '...'; 
        } else {
            text = value;
        }

        return text;
    }

    return (
        <div className="content px-3 my-3">
            {
                state.edit ? (
                    <ReviewForm
                        callback={(edited_review) => onEdited(edited_review)}
                        cancel={() => dispatch({ type: 'TOGGLE_EDIT', payload: false})}
                        mode="edit"
                        review_id={state.review._id}
                    />
                ) : (
                    <Typography variant="body2">
                        <Linkify 
                            options={{
                                tagName: {
                                    hashtag: 'span'
                                },
                                format: (value, type) => prepHashrags(value, type)  
                            }}
                            >
                            {state.review.content}
                        </Linkify>
                    </Typography>
                )
            }
        </div>
    )
}

export default Content;
