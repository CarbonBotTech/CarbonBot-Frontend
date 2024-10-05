import React from "react";
import BotList from './../Bot/BotList';

export default function Bots(props) {
    return (
        <BotList
            query={{ 'user': props.user_id }}
            {...props}
        />
    )
}
