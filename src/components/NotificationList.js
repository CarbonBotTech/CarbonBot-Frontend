import React, { useEffect, Fragment, useState, forwardRef} from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemAvatar, Divider, Paper, LinearProgress, ListItemSecondaryAction } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getNotifications, markAsRead } from './../helpers/manageNotifications';
import { SetCount } from './../store/actions/notifications.js';
import { useSelector, useDispatch } from 'react-redux';
import config from "../config";
import Pagination from '@material-ui/lab/Pagination';
import Avatar from './Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const NotificationList = (props) => {

    // state
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        start: 0,
        current: 1,
        total: 0
    });
    
    // redux
    const redux = useSelector(state => state);
    const dispatch = useDispatch();

    // lifecycles
    useEffect(() => {
        handleGetPosts(
            0,
            config.LIMIT
        );
    },[]);

    /**
     * Mark all notifications as read if "Mark all as read" button is clicked
     * Only happens if the current notification count > 0 and notifications are done loading
     */
    useEffect(() => {
        if(notifications.length > 0 && redux.notifications === 0 && !loading) {
            setNotifications(prevNotifications => 
                prevNotifications.map(
                    notification => notification.read === false
                    ?
                    {
                        ...notification, 
                        read: true
                    }
                    :
                    notification
                )
            );
        }
    },[redux.notifications]);

    // methods
    const handleGetPosts = async (start,limit) => {
        setLoading(true);
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
        const [error, response] = await getNotifications(redux.app.token,parsed_query);
        setLoading(false);
        if(error) return;
        setPagination({
            ...pagination,
            total: response.data.pages,
            current: response.data.current,
            start: start
        });
        setNotifications(response?.data?.notifications);
    }

    const loadMore = (next) => {
        handleGetPosts(
            next,
            config.LIMIT
        );
    }

    const NotificationText = ({notification}) => {
        switch(notification.type) {
            case 'review': 
                return `Reviewed your bot ${notification.bot?.name}.`;
            case 'helpful': 
                return `Found your review of ${notification.bot?.name} helpful.`;
            case 'like': 
                let like_text = notification.post?.title ? 'Liked your post "' + notification.post?.title + '".' : 'Liked your post.'
                return like_text;
            case 'dislike': 
                let dislike_text = notification.post?.title ? 'Disliked your post "' + notification.post?.title + '".' : 'Disliked your post.'
                return dislike_text;
            case 'comment': 
                let comment_text = `Commented under your post.`;
                return comment_text;
            case 'reply': 
                let reply_text = `Replied to you.`;
                return reply_text;
            case 'collection': 
                let collection_text = `Liked your collection "${notification.collection_?.title}".`;
                return collection_text;
            default:
                return '';
        }
    }

    const NotificationLink = (notification) => {
        switch(notification.type) {
            case 'review': 
                return `/bots/${notification.bot?.slug}`
            case 'helpful': 
                return `/bots/${notification.bot?.slug}`
            case 'like': 
                return `/community/${notification.post?._id}`
            case 'dislike': 
                return `/community/${notification.post?._id}`
            case 'comment': 
                return `/community/${notification.post?._id}?highlight=${notification.comment?._id}`
            case 'reply': 
                return `/community/${notification.post?._id}?highlight=${notification.reply?._id}`
            case 'collection': 
                return `/collections/${notification.collection_?.slug}`
            default:
                return '/';
        }
    }

    const handleMarkAsRead = async(id) => {
        if(redux.notifications === 0) return;
        dispatch(SetCount(redux.notifications-1));
        const [error, response] = await markAsRead(redux.app.token,id);
        if(error) return;
    }

    return (
        <div id="top">
            {
                loading ? (
                    <LinearProgress color="secondary"/>
                ) : (
                    <Fragment>
                        {
                            (notifications.length === 0 && !loading) ? (
                                <Alert severity="info">No notifications were found.</Alert>
                            ) : (
                                <Paper>
                                    <List>
                                        {
                                            notifications.map((notification,index) => {
                                                return (
                                                    <Fragment key={notification._id}>
                                                        <ListItem
                                                            button
                                                            component={ForwardNavLink}
                                                            to={NotificationLink(notification)}
                                                            onClick={() => handleMarkAsRead(notification._id)}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar 
                                                                    user={notification.user} 
                                                                    size={40}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText 
                                                                primary={notification.user?.profile && notification.user?.profile?.display_name ? notification.user?.profile?.display_name : notification.user?.username} 
                                                                secondary={<NotificationText notification={notification}/>} 
                                                            />
                                                            <ListItemSecondaryAction>
                                                                {
                                                                    !notification.read && <FiberManualRecordIcon color="primary" style={{fontSize: '12px'}}/>
                                                                }
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        { index < notifications.length - 1 && <Divider/> }
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </List>
                                </Paper>
                            )
                        }
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
                    </Fragment>
                )
            }
        </div>
    )
}

export default NotificationList;