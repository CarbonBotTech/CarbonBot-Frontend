import React from "react";
import { Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './../sass/Collection.scss';
import Poster from "./../components/Poster";
import Avatar from './../components/Avatar'

export default function CollectionItem({item}) {

    return (
        <Paper className="collection-item">
            <Link 
                to={{
                pathname: '/collections/' + item?.slug,
                state: {
                    collection: item
                }
            }}>
                <Poster src={item?.poster} height={180}/>
            </Link>
            <div className="px-3 pb-3">
                <Typography variant="h5">
                    <Link 
                        style={{color: 'inherit'}}
                        to={{
                        pathname: '/collections/' + item?.slug,
                        state: {
                            collection: item
                        }
                    }}>
                        {item?.title}
                    </Link>
                </Typography>
                <div className="author d-flex align-items-center">
                    <Avatar user={item.user} size={25} link={true}/>
                    <Typography variant="caption" className="ml-2">
                        By <Link to={"/u/" + item?.user?.username}><strong>{item.user.profile && item.user.profile.display_name ? item.user.profile.display_name : item.user.username}</strong></Link>
                    </Typography>
                </div>
                <Typography variant="body2" className="description">
                    {item?.about}
                </Typography>
                <Typography variant="caption" className="meta">
                    {item?.bots?.length} Bots &mdash; {item?.upvote_counter} Likes
                </Typography>
            </div>
        </Paper>
    )

}
