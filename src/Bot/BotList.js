import React, { Fragment, useState, useEffect } from "react";
import { Typography, List, Button, ListItem, ListItemText, ListItemAvatar, Divider, Paper, LinearProgress, ListItemSecondaryAction } from '@material-ui/core';
import Avatar from './../components/Avatar';
import RenderPlatforms from './../components/RenderPlatforms';
import CommentIcon from '@material-ui/icons/Comment';
import Rating from '@material-ui/lab/Rating';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import config from "./../config";
import CategoryFilter from './../components/CategoryFilter';
import SortingFilter from './../components/SortingFilter';
import { getBots } from './../helpers/manageBots';
import { getBotsFromCollection, addOrRemoveBot } from './../helpers/manageCollections';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const BotList = (props) => {

    // state
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [filters, setFilters] = useState(null);
    const [categories, setCategories] = useState('');
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

        /**
         * Check address bar if any category search params are available
         */
        let initial_categories;
        let search_params = new URLSearchParams(history.location.search);
        let parsed_query = search_params.get('_categories');

        if(parsed_query) {
            let slugs = parsed_query.split(',').slice(0, 5); // get only first 5 items from the array
            let verified_slugs = [];
            // verify slugs if they are real using saved categories in redux
            slugs.map(slug => {
                if(redux.categories.find(category => category.slug === slug)) {
                    verified_slugs.push(slug)
                }
            });
            initial_categories = verified_slugs.join(',');
            setCategories(initial_categories);
        }

        setLoading(true);
        if(!props.match.params.platform) {
            handleGetBots(
                null,
                initial_categories,
                0,
                config.LIMIT,
                filters
            );
            return;
        }
        handleGetBots(
            props.match.params.platform,
            initial_categories,
            0,
            config.LIMIT,
            filters
        );

    },[props.match.params.platform]);

    // methods
    const loadMore = (next) => {
        handleGetBots(
            props.match.params.platform ? props.match.params.platform : null,
            categories,
            next,
            config.LIMIT,
            filters
        );
    }
    
    const handleGetBots = async (platform, categories, start, limit, filters) => {

        let query_object = {
            _start: start,
            _limit: limit
        }
        if(platform) {
            query_object.platforms = platform;
        }
        if(categories) {
            query_object.categories = categories;
        }
        if(props.query) {
            query_object = {
                ...query_object,
                ...props.query
            }
        }
        if(filters) {
            query_object._sort = filters; // overwrite original _sort
        }

        let parsed_query = new URLSearchParams(query_object).toString();

        let error, response;
        if(props.mode === "collection" || props.mode === "edit_collection") {
            [error, response] = await getBotsFromCollection(parsed_query,props.collection_id);
        } else {
            [error, response] = await getBots(parsed_query);
        }

        setLoading(false);

        if(error) {
            return;
        }

        setPagination({
            ...pagination,
            total: response.data.pages,
            current: response.data.current,
            start: start
        });

        setBots(response.data.bots);

    }

    const handleRemoveBot = async(bot_id,collection_id) => {
        let confirmation = window.confirm("Are you sure?");
        if(confirmation) {
            setSubmitting(true);
            const [error, response] = await addOrRemoveBot(redux.app.token,bot_id,collection_id);
            setSubmitting(false);
            if(error) return;
            setBots(bots.filter(bot => bot._id !== bot_id)); // remove bot from array
            enqueueSnackbar('Success! This bot has been removed.', { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
        }
    }

    return (
        <Fragment>

            <div className="row mb-3" id="top">
                <div className="col-md-11 col-10">
                    <CategoryFilter
                        {...props}
                        categories={redux.categories}
                        onFilterApplied={(selected_categories) => {

                            /**
                             * Convert object to address bar query ?_categories=value1,value2,etc
                             */

                            let slugs = selected_categories.map((category) => {
                                return category.slug; // object to array of slugs
                            });
                            let stringify_slugs = slugs.join(",")

                            history.push({
                                search: '?_categories=' + stringify_slugs
                            });

                            setCategories(stringify_slugs);

                            handleGetBots(
                                props.match.params.platform,
                                stringify_slugs,
                                0,
                                config.LIMIT,
                                filters
                            );
                        }}
                        onCleared={() => {
                            setCategories('');
                        }}
                    />
                </div>
                <div className="col-2 col-md-1 text-right">
                    <SortingFilter
                        onFilterApplied={(selected_filters) => {
                            setFilters(selected_filters);
                            handleGetBots(
                                props.match.params.platform,
                                categories,
                                0,
                                config.LIMIT,
                                selected_filters
                            );
                        }}
                        onCleared={() => {
                            setFilters(null);
                            handleGetBots(
                                props.match.params.platform,
                                categories,
                                0,
                                config.LIMIT,
                                null
                            );
                        }}
                    />
                </div>
            </div>
            {
                loading ? (
                    <LinearProgress color="secondary"/>
                ) : (
                    <Fragment>
                        {
                            (bots.length === 0 && !loading) ? (
                                <Alert severity="info">No bots were found.</Alert>
                            ) : (
                                <Paper>
                                    <List>
                                        {
                                            bots.map((bot,index) => {
                                                return (
                                                    <Fragment key={bot._id}>
                                                        <ListItem
                                                            button
                                                            onClick={() => {
                                                                if(props.mode === 'admin') {
                                                                    history.push({
                                                                        pathname: '/settings/bots/' + bot._id,
                                                                        state: bot
                                                                    })
                                                                } else if(props.mode === 'edit_collection') {
                                                                    return;
                                                                } else {
                                                                    history.push({
                                                                        pathname: '/bots/' + bot.slug,
                                                                        state: bot
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar 
                                                                    bot={bot} 
                                                                    size={40}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText 
                                                                primary={
                                                                    <span className="d-flex align-items-center">
                                                                        <Typography variant="body1"><strong>{bot.name}</strong></Typography>
                                                                        {
                                                                            bot.rating >= 4 && <Rating className="ml-1" size="small" precision={1} value={bot.rating} readOnly />
                                                                        }
                                                                    </span>
                                                                } 
                                                                disableTypography={true}
                                                                secondary={<RenderPlatforms 
                                                                    source={bot.platforms} 
                                                                    max={2} 
                                                                    promote={props.promote ? props.promote : ''}
                                                                />} 
                                                            />
                                                            <ListItemSecondaryAction>
                                                                {
                                                                    props.mode === 'edit_collection' ? (
                                                                        <Fragment>
                                                                            <Button 
                                                                                style={{color:'#f44336'}}
                                                                                disabled={submitting}
                                                                                variant="outlined"
                                                                                onClick={() => handleRemoveBot(bot._id,props.collection_id)} 
                                                                                >
                                                                                Remove
                                                                            </Button>
                                                                        </Fragment>
                                                                    ) : (
                                                                        <Fragment>
                                                                            <CommentIcon className="mr-1" style={{ color: '#888', fontSize: '17px' }}/>
                                                                            <Typography variant="caption">
                                                                                {bot.reviews}
                                                                            </Typography>
                                                                        </Fragment>
                                                                    )
                                                                }
                                                                
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        { index < bots.length - 1 && <Divider/> }
                                                        
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </List>
                                </Paper>
                            )
                        }
                    </Fragment>
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
                                if(!el) return;
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

export default BotList;