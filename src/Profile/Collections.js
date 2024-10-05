import React, { Fragment } from "react";
import { CollectionList } from './../Collection';

export default function Collections({user_id}) {
    return (
        <Fragment>
            <CollectionList
                query={{ '_start': 0, '_limit': 15, _sort: 'upvote_counter:desc', user: user_id }}
                mode="presentation"
            />
        </Fragment>
    )

}
