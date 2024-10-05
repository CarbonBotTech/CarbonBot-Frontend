import React, { Fragment } from "react";
import PostList from './../Community/PostList';

export default function Posts(props) {

    return (
        <Fragment>
            <PostList
                {...props}
                query={{ _sort: 'createdAt:desc', user: props.user_id }}
                disable_form={true}
            />
        </Fragment>
    )

}
