import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCollection, voteCollection } from './../helpers/manageCollections';
import { 
    Breadcrumbs, 
    Typography,
    Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import BotList from './../Bot/BotList';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { CollectionItem } from './';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import { parseErrors } from './../helpers/parseErrors';

export default function Collection(props) {
    
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [has_voted, setVoted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // redux
    const redux = useSelector(state => state);

    // misc hooks
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    useEffect(() => {
        handleGetCollections(props.match.params.slug)
    },[]);

    useEffect(() => {
        if(redux.app.loggedin && collection) {
            let find_vote = collection.upvotes.find(voter => voter === redux.app.user.id);
            if(find_vote) {
                setVoted(true);
            } else {
                setVoted(false);
            }
        }
    },[collection && collection.upvotes]);

    // methods
    const handleGetCollections = async (slug) => {
        if(props.location?.state?.collection && slug === props.location?.state?.collection?.slug) {
            setCollection(props.location.state.collection)
            setLoading(false);
            return;
        }
        const [error, response] = await getCollection('slug=' + slug);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setLoading(false);
            return;
        }
        setCollection(response.data?.collections[0]);
        setLoading(false);
    }

    const handleVoteCollection = async (id) => {
        if(!redux.app.loggedin) {
            enqueueSnackbar('Attention! You need to be loggedin to vote.', { 
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            return;
        }
        setSubmitting(true);
        const [error, response] = await voteCollection(redux.app.token,id);
        setSubmitting(false);
        if(error) {
            return;
        }
        setCollection({
            ...collection,
            upvote_counter: response.data.upvote_counter,
            upvotes: response.data?.upvotes?.map((voter) => voter._id)
        });
        if( props.location?.state?.collection ) {
            // update current local state in location
            const { state } = props.location;
            props.history.replace({ ...props.history.location, state: {
                collection: {
                    ...state.collection,
                    upvote_counter: response.data.upvote_counter,
                    upvotes: response.data?.upvotes?.map((voter) => voter._id)
                }
            } });
        }
        let find_current_user_vote = response.data?.upvotes.find(voter => voter._id === redux.app.user._id);
        if(find_current_user_vote) {
            setVoted(true);
        } else {
            setVoted(false);
        }
    }

    if(loading) return null;

    if(!loading && error) {
        return (
            <div className="col-md-10 col-12">
                <Error error={error} />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="col-md-10 col-12">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    <Link color="inherit" to="/collections">
                        Collections
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="col-md-10 col-12 mb-3">
                <Typography variant="h4" className="mt-1">
                    {collection?.title ? collection.title : 'Not found'}
                </Typography>
            </div>
            <div className="col-md-10 col-12 mb-3">
                <div className="row">
                    <div className="col-md-8 col-12 order-md-0 order-1">
                        {
                            error ? (
                                <Alert severity="info">
                                    Could not find this collection.
                                </Alert>  
                            ) : (
                                <BotList
                                    query={{ '_sort': 'createdAt:desc' }}
                                    {...props}
                                    mode="collection"
                                    collection_id={collection._id}
                                />
                            )
                        }
                    </div>
                    <div className="col-md-4 col-12 mt-md-3 mt-0 mt-md-0 order-md-1 order-0">
                        <CollectionItem item={collection}/>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            className="w-100 mb-3 mt-3"
                            color={has_voted ? 'secondary' : 'default'}
                            onClick={(event) => handleVoteCollection(collection._id)}
                            startIcon={<ThumbUpAltOutlinedIcon />}
                            disabled={submitting}
                        >
                            { has_voted ? 'Unlike' : 'Like' }
                        </Button>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}