import React, { useEffect, useState } from "react";
import Post from './';
import { getPostById } from './../helpers/manageCommunity';
import { parseErrors } from './../helpers/parseErrors';
import Error from './../components/Error';

export default function DirectPost(props) {

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        handleGetPostById(props.match.params.post_id)
    },[]);

    const handleGetPostById = async(id) => {
        const [error, response] = await getPostById(id);
        
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setLoading(false);
            return;
        }
        setPost(response.data);
        setLoading(false);  
    }

    if(loading) return null;

    if(!loading && error) {
        return (
            <div className="col-md-6 col-12 mb-3">
                <Error error={error} /> 
            </div>
        )
    }
    
    return (
        <div className="col-md-6 col-12 mb-3">
            <Post {...props} post={post} direct={true}/>
        </div>
    )

}
