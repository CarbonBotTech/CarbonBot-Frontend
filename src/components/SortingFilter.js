
import React, { Fragment, useState } from "react";
import { Popover, IconButton, Button, List, ListItem, ListItemText, ListItemIcon, Divider, Checkbox, ListSubheader, RadioGroup } from '@material-ui/core';
import './../sass/CategoryFilter.scss';
import FilterListIcon from '@material-ui/icons/FilterList';

const SortingFilter = ({onFilterApplied}) => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [date_filter, setDateFilter] = useState('desc');
    const [rating_filter, setRatingFilter] = useState('');
    const [review_filter, setReviewFilter] = useState('');

    // methods
    const handleChangeDate = (sort) => {
        setDateFilter(sort);
        setRatingFilter('');
        setReviewFilter('');
    };
    const handleChangeReviewed = (sort) => {
        setDateFilter('');
        setRatingFilter('');
        setReviewFilter(sort);
    };
    const handleChangeRating = (sort) => {
        setDateFilter('');
        setRatingFilter(sort);
        setReviewFilter('');
    };

    return (
        <Fragment>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onExited={() => {
                    let filters = [];
                    if(date_filter) {
                        filters.push("createdAt:" + date_filter);
                    }
                    if(rating_filter) {
                        filters.push("rating:" + rating_filter);
                    }
                    if(review_filter) {
                        filters.push("reviews:" + review_filter);
                    }
                    onFilterApplied(filters.join());
                    
                }}
            >
                <Fragment>
                    <List
                        subheader={
                            <ListSubheader component="div" disableSticky={true} className="mt-2" style={{lineHeight: 2}}>
                                Date
                            </ListSubheader>
                        }
                        dense>
                        <ListItem dense button onClick={() => handleChangeDate('desc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="desc"
                                    checked={date_filter === 'desc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Newest`} />
                        </ListItem>
                        <ListItem dense button onClick={() => handleChangeDate('asc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="asc"
                                    checked={date_filter === 'asc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Oldest`} />
                        </ListItem>
                    </List>
                    <Divider/>
                    <List
                        subheader={
                            <ListSubheader component="div" disableSticky={true} className="mt-2" style={{lineHeight: 2}}>
                                Reviews
                            </ListSubheader>
                        }
                        dense>
                        <ListItem dense button onClick={() => handleChangeReviewed('desc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="desc"
                                    checked={review_filter === 'desc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Most reviewed`} />
                        </ListItem>
                        <ListItem dense button onClick={() => handleChangeReviewed('asc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="asc"
                                    checked={review_filter === 'asc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Least reviewed`} />
                        </ListItem>
                    </List>
                    <Divider/>
                    <List
                        subheader={
                            <ListSubheader component="div" disableSticky={true} className="mt-2" style={{lineHeight: 2}}>
                                Rating
                            </ListSubheader>
                        }
                        dense>
                        <ListItem dense button onClick={() => handleChangeRating('desc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="desc"
                                    checked={rating_filter === 'desc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Highest rated`} />
                        </ListItem>
                        <ListItem dense button onClick={() => handleChangeRating('asc')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    name="asc"
                                    checked={rating_filter === 'asc'}
                                    tabIndex={-1}
                                    disableRipple
                                    className="p-0 ml-0"
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Lowest rated`} />
                        </ListItem>
                    </List>
                    <Divider/>
                    <div className="px-3 py-3 text-right">
                        <Button
                            size="small"
                            onClick={(e) => {
                                setDateFilter('desc');
                                setRatingFilter('');
                                setReviewFilter('');
                                setAnchorEl(null);
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            size="small"
                            className="ml-3"
                            onClick={(e) => {
                                setAnchorEl(null);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                    
                </Fragment>
            </Popover>
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <FilterListIcon />
            </IconButton>
            
        </Fragment>
    )
}

export default SortingFilter;