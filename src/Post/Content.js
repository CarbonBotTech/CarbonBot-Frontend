import React, { useContext, useEffect, useState, Fragment } from "react";
import { Typography } from '@material-ui/core';
import ParseLink from './ParseLink';
import PostForm from './PostForm';
import ArticleParser from './ArticleParser';
import StoryPreview from './/StoryPreview';
import { AppContext } from './index';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';
import { Link } from 'react-router-dom';
hashtag(linkify);

const Content = ({preview}) => {

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
        dispatch({ type: 'SET_POST', payload: {
            ...state.post,
            content: edited_post.content,
            title: edited_post.title,
            channel: edited_post.channel
        }});
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
        <div className="content px-3 my-3">
            {
                !editing ? (
                    <Fragment>
                        {
                            state.post.title && (
                                <Link style={{color:'inherit'}} to={"/community/" + state.post._id}>
                                    <Typography variant="body1" className="mb-1">
                                        <strong>{state.post.title}</strong>
                                    </Typography>
                                </Link>
                            )
                        }
                        {
                            state.post.type === "text" ? (
                                <Fragment>
                                    <Typography variant="body2">
                                        <Linkify 
                                            options={{
                                                tagName: {
                                                    hashtag: 'span'
                                                },
                                                format: (value, type) => prepHashrags(value, type)  
                                            }}
                                            >
                                            {state.post.content.blocks[0]['data']['text']}
                                        </Linkify>
                                    </Typography>
                                    {
                                        state.post.link && <ParseLink link={state.post.link}/> 
                                    }
                                </Fragment>
                            ) : (
                                <div className="article">
                                    {
                                        preview ? (
                                            <StoryPreview post={state.post}/>
                                        ) : (
                                            <Fragment>
                                                {
                                                    state.post.content.blocks.map(
                                                        (Block, i) =>
                                                            <Fragment key={ i }>
                                                                <ArticleParser block={Block}/>
                                                            </Fragment>
                                                        ) 
                                                }
                                            </Fragment>
                                        )
                                    }
                                    
                                </div>
                            )
                        }
                        
                        
                    </Fragment>
                ) : (
                    <PostForm
                        callback={(edited_post) => postEdited(edited_post)}
                        mode="edit"
                        post_id={state.post._id}
                        channel={state.post.channel.slug}
                    />
                )
            }
        </div>
    )
}

export default Content;
