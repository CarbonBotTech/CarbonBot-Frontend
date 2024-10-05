import React, { Fragment, useState, useEffect } from "react";
import { Typography, Button, List, ListItem, ListItemText, Divider, Paper, LinearProgress, ListItemSecondaryAction } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import config from "./../config";
import Alert from '@material-ui/lab/Alert';
import { getCollection, addOrRemoveBot } from './../helpers/manageCollections';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CollectionItem from "./CollectionItem";

const CollectionList = (props) => {

    // state
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [pagination, setPagination] = useState({
        start: 0,
        current: 1,
        total: 0
    });

    // hooks
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    // redux
    const redux = useSelector(state => state);

    // lifecycles
    useEffect(() => {
        setLoading(true);
        handleGetCollections(
            0,
            config.LIMIT
        );
    },[]);

    useEffect(() => {
        if(props.preload?.length > 0) {
            setCollections([...props.preload, ...collections]);
        }
    },[props.preload]);

    // methods
    const loadMore = (next) => {
        handleGetCollections(
            next,
            config.LIMIT
        );
    }
    
    const handleGetCollections = async (start, limit) => {
        let query_object = {
            _start: start,
            _limit: limit
        }
        if(props.query) {
            query_object = {
                ...query_object,
                ...props.query
            }
        }
        let parsed_query = new URLSearchParams(query_object).toString();
        const [error, response] = await getCollection(parsed_query);
        setLoading(false);
        if(error) return;
        setPagination({
            ...pagination,
            total: response.data.pages,
            current: response.data.current,
            start: start
        });
        setCollections(response.data.collections);
    }

    const DisplayAddOrRemoveControls = ({bot_id,collection}) => {
        let find_bot = collection.bots.find(bot => bot === bot_id);
        if(find_bot) {
            return (
                <Button 
                    size="small" 
                    disabled={submitting} 
                    onClick={() => handleAddOrRemoveBot(bot_id,collection._id)} 
                    style={{color:'#f44336'}} variant="outlined">
                        Remove
                </Button>
            )
        }
        return (
            <Button 
                size="small" 
                disabled={submitting} 
                onClick={() => handleAddOrRemoveBot(bot_id,collection._id)} 
                color="primary" 
                variant="outlined">
                    Add
            </Button>
        )
    }

    const handleAddOrRemoveBot = async(bot_id,collection_id) => {
        setSubmitting(true);
        const [error, response] = await addOrRemoveBot(redux.app.token,bot_id,collection_id);
        setSubmitting(false);
        if(error) return;
        setCollections(prevCollections => 
            prevCollections.map(
                collection => collection._id === collection_id
                ?
                {
                    ...collection, 
                    bots: response.data.bots,
                    bot_counter: response.data.bot_counter
                }
                :
                collection
            )
        );
        enqueueSnackbar('Success! This collection has been modified.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }

    return (
        <Fragment>
            {
                loading ? (
                    <LinearProgress color="secondary" className="mb-3"/>
                ) : (
                    <div id="top">
                        {
                            (collections.length === 0 && !loading) ? (
                                <Alert severity="info">No collections were found.</Alert>
                            ) : (
                                props.mode === "presentation" ? (
                                    <div className="row">
                                        {
                                            collections.map((collection,index) => {
                                                return (
                                                    <div className="col-md-6 col-12 mb-3" key={index}>
                                                        <CollectionItem item={collection}/>
                                                    </div>
                                                )
                                            })
                                        }       
                                    </div>
                                ) : (
                                    <Paper>
                                        <List dense>
                                            {
                                                collections.map((collection,index) => {
                                                    return (
                                                        <Fragment key={collection._id}>
                                                            <ListItem
                                                                dense
                                                                button={props.mode === 'add' ? false : true}
                                                                onClick={() => {
                                                                    if(props.mode === 'add') {
                                                                        return;
                                                                        //handleAddOrRemoveBot(props.bot_id,collection._id);
                                                                    } else if(props.mode === 'edit') {
                                                                        history.push('/settings/collections/' + collection._id)
                                                                    } else return;
                                                                }}
                                                            >
                                                                <ListItemText 
                                                                    primary={
                                                                        <Typography variant="body1"><strong>{collection.title}</strong> ({collection.bot_counter})</Typography>
                                                                    } 
                                                                    secondary={
                                                                        <Typography variant="body2">{collection.about}</Typography>
                                                                    }
                                                                    disableTypography={true}
                                                                />
                                                                <ListItemSecondaryAction>

                                                                    {
                                                                        props.mode === "add" && (
                                                                            <>
                                                                                <DisplayAddOrRemoveControls 
                                                                                    collection={collection}
                                                                                    bot_id={props.bot_id}
                                                                                />
                                                                            </>
                                                                        )
                                                                    }
                                                                    
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                            { index < collections.length - 1 && <Divider/> }
                                                            
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Paper>
                                )
                            )
                        }
                    </div>
                )
            }
            {
                !loading && (
                    <div className="d-flex justify-content-center my-3">
                        <Pagination 
                            count={pagination.total} 
                            color="primary" 
                            page={pagination.current} 
                            onChange={(e, next) => {

                                let next_start = next * config.LIMIT - config.LIMIT;
                                loadMore( next_start );
                                const el = document.getElementById("top");
                                el.scrollIntoView({
                                    behavior: 'auto',
                                    block: 'center',
                                    inline: 'center'
                                });

                            }}/>
                    </div>
                )
            }
        </Fragment>
    )

}

export default CollectionList;