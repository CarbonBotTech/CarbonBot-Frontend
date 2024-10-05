import React, { Fragment } from "react";
import ReviewList from './../Review/ReviewList';

export default function Reviews({user_id}) {
    return (
        <Fragment>
            <ReviewList
                disable_form={true}
                query={{ _sort: 'createdAt:desc', user: user_id }}
            />
        </Fragment>
    )

}
