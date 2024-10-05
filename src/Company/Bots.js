import React from "react";
import BotList from './../Bot/BotList';

export default function Bots(props) {
    return (
        <BotList
            query={{ 'company': props.company_id }}
            {...props}
        />
    )
}
