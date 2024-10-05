import React, { Fragment, useState, useEffect } from "react";
import CommentForm from './CommentForm';
import { getComments } from './../helpers/manageComments';
import { useSelector } from 'react-redux';
import { 
    LinearProgress,
    Divider
} from '@material-ui/core';
import Comment from './Comment/index';
import Alert from '@material-ui/lab/Alert';


const Comments = ({post_id}) => {

    // state
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // redux
    const app = useSelector(state => state.app);

    useEffect(()=> {
        handleGetComments(post_id);
    },[]);

    // methods
    const handleGetComments = async(post_id) => {
        const [error, response] = await getComments(post_id);
        setLoading(false);
        if(error) return;
        setComments(response.data);

        /**
         * Scroll to highlighted comment / reply
         */
        const params = new URLSearchParams(window.location.search);
        const highlight = params.get('highlight')
        const el = document.getElementById(highlight);
        if(!el) return;
        el.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
    const commentPosted = (new_comment) => {
        setComments([{
            ...new_comment,
            user: app.user
        },...comments]);
    }

    const replyPosted = (new_reply) => {
        new_reply.user = app.user;
        setComments(prevComments => 
            prevComments.map(
                comment => comment._id === new_reply.parent._id
                ?
                {
                    ...comment, 
                    replies: [...comment.replies,new_reply]
                }
                :
                comment
            )
        );
    }

    return (
        <div className="px-3 pb-3">
            <CommentForm 
                post_id={post_id}
                callback={(new_comment) => commentPosted(new_comment)}
            />
            {
                loading && <LinearProgress color="secondary"/>
            }
            {
                !loading && comments.length === 0 && (
                    <Alert severity="info">No comments yet.</Alert>
                )
            }
            {
                comments.map((comment, index) => {
                    return (
                        <Fragment key={comment._id}>
                            <Comment 
                                comment={comment}
                                callback={(new_comment) => replyPosted(new_comment)}
                            />
                            { index < comments.length - 1 && <Divider className="my-3"/> }
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Comments;