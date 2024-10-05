import React, { Fragment, memo } from "react";
import { Icon, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AvatarComponent = ({company, user, icon, bot, size, link}) => {
    if(user) {
        if(link) {
            return (
                <Link to={'/u/' + user.username}>
                    <Avatar 
                        style={{
                            width: size ? size : 50,
                            height: size ? size : 50,
                            fontSize: size ? size * 0.7 : 50 * 0.7,
                        }}
                        src={user.profile ? user.profile?.avatar : ''}
                        >
                        { user.username?.charAt(0).toUpperCase() }
                    </Avatar>
                </Link>
            )
        } 
        return (
            <Avatar 
                style={{
                    width: size ? size : 50,
                    height: size ? size : 50,
                    fontSize: size ? size * 0.7 : 50 * 0.7,
                }}
                src={user.profile ? user.profile?.avatar : ''}
                >
                { user.username?.charAt(0).toUpperCase() }
            </Avatar>
        )
    } else if(company) {
        return (
            <Fragment>
                <Avatar 
                    variant={"rounded"}
                    style={{
                        width: size ? size : 50,
                        height: size ? size : 50,
                        fontSize: size ? size * 0.7 : 50 * 0.7,
                    }}
                    src={company ? company.logo : ''}
                    >
                    { company.name?.charAt(0).toUpperCase() }
                </Avatar>
            </Fragment>
        )
    } else if(bot) {
        return (
            <Fragment>
                <Avatar 
                    variant={"rounded"}
                    style={{
                        width: size ? size : 50,
                        height: size ? size : 50,
                        fontSize: size ? size * 0.7 : 50 * 0.7,

                    }}
                    src={bot ? bot.logo : ''}
                    >
                    { bot.name?.charAt(0).toUpperCase() }
                </Avatar>
            </Fragment>
        )
    } else {
        return null
    }
}

export default memo(AvatarComponent);