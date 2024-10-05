import React from "react";
import { NavLink } from 'react-router-dom';
import { Typography, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReviewForm from './../../Review/ReviewForm';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const EditReview = (props) => {

    const handleCancelEdit = () => {
        props.history.push("/settings/reviews")
    }

    const handleEditReview = () => {
        props.history.push("/settings/reviews")
    } 

    return (
        <div className="row">
            <div className="col-md-10 col-12">
                <Typography 
                    variant="h5"
                    className="mb-2"
                >
                    <IconButton 
                        style={{marginLeft:'-7px'}}
                        aria-label="Go back" 
                        size="small"
                        component={ForwardNavLink}
                        to="/settings/reviews"
                        >
                        <ArrowBackIcon />
                    </IconButton>
                    <strong className="ml-2">Edit Review</strong>
                </Typography>
            </div>
            <div className="col-md-10 col-12">
                <ReviewForm
                    callback={() => handleEditReview()}
                    mode="edit"
                    review_id={props.match.params.id}
                    cancel={() => handleCancelEdit()}
                />
            </div>
        </div>
    )
}

export default EditReview;