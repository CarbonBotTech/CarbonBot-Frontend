import React, { useEffect, Fragment, useState, forwardRef} from "react";
import { useParams, NavLink } from "react-router-dom";
import { 
    LinearProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getPosts } from './../helpers/manageCommunity';
import { useSelector } from 'react-redux';
import Post from './../Post';
import config from "./../config";
import Pagination from '@material-ui/lab/Pagination';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const PostList = (props) => {

    // state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        start: 0,
        current: 1,
        total: 0
    });

    // hooks
    const params = useParams();
    
    // redux
    const redux = useSelector(state => state);

    // lifecycles
    useEffect(() => {
        if(params.trend) {
            handleGetPosts(
                0,
                config.LIMIT,
                null,
                params.trend
            );
            return
        }
        handleGetPosts(
            0,
            config.LIMIT,
            null,
            null
        );
    },[params.trend]);

    // methods
    const handleGetPosts = async (start,limit,channel_slug,trend) => {
        setLoading(true);
        let query_object = {
            _start: start,
            _limit: limit
        }
        if(channel_slug) {
            query_object.channel = channel_slug
        }
        if(props.query) {
            query_object = {
                ...query_object,
                ...props.query
            }
        }
        if(trend) {
            query_object.trend = trend;
        }

        let parsed_query = new URLSearchParams(query_object).toString();
        const [error, response] = await getPosts(parsed_query);
        setLoading(false);
        if(error) return;
        setPagination({
            ...pagination,
            total: response.data.pages,
            current: response.data.current,
            start: start
        });
        setPosts(response?.data?.posts);
    }

    const loadMore = (next) => {
        handleGetPosts(
            next,
            config.LIMIT,
            null,
            params.trend
        );
    }

    return (
        <div id="top">
            {
                !loading && posts.length === 0 && (
                    <Alert severity="info">No posts yet.</Alert>
                )
            }
            {
                loading ? (
                    <LinearProgress color="secondary"/>
                ) : (
                    <Fragment>
                        {
                            posts?.map((post) => (
                                <div key={post?._id}>
                                    <Post {...props} post={post}/>
                                </div>
                            ))
                        }
                        <div className="d-flex justify-content-center my-3">
                            <Pagination 
                                count={pagination.total} 
                                color="primary" 
                                page={pagination.current} 
                                onChange={(e, next) => {

                                    let next_start = next * config.LIMIT - config.LIMIT
                                    loadMore( next_start );
                                    const el = document.getElementById("top");
                                    el.scrollIntoView({
                                        behavior: 'auto',
                                        block: 'center',
                                        inline: 'center'
                                    });

                                }}/>
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

export default PostList;