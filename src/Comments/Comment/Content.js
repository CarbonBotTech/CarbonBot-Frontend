import React, { useContext, useEffect, useState, Fragment } from "react";
import { Typography } from '@material-ui/core';
import { AppContext } from './index';
//import { AppContext } from './context';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';
import { Link } from 'react-router-dom';
hashtag(linkify);

const Content = ({comment}) => {

    // state
    const [editing, setEditing] = useState(false);

    // context
    const {state, dispatch} = useContext(AppContext);

    // lifecycle
    useEffect(() => {
        setEditing(state.edit)
    },[state]);

    // methods
    const postEdited = (edited_post) => {
        dispatch({ type: 'TOGGLE_EDIT', payload: !state.edit});
    }

    const prepHashrags = (value, type) => {

        let text;
        if(type == 'hashtag') {
            text = <Link to={'/community/tags/' + value.replace('#','')}>{value}</Link>
        } else if(type == 'url' && value.length > 140) {
            text = value.slice(0, 140) + '...'; 
        } else {
            text = value;
        }

        return text;
    }

    

    return (
        <div className="content my-2">
            {
                !editing ? (
                    <Fragment>
                        {
                            state.comment.approved ? (
                                <Typography variant="body2" id={state.comment._id}>
                                    <Linkify 
                                        options={{
                                            tagName: {
                                                hashtag: 'span'
                                            },
                                            format: (value, type) => prepHashrags(value, type)  
                                        }}
                                        >
                                        {comment.content}
                                    </Linkify>
                                </Typography>
                            ) : (
                                <Typography variant="body2" style={{fontStyle: 'italic', color: '#666'}}>
                                    Removed
                                </Typography>
                            )
                        }
                        
                    </Fragment>
                ) : (
                    <div>123</div>
                )
            }
        </div>
    )
}

export default Content;
