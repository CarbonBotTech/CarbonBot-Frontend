import React, { useState, forwardRef } from "react";
import { useParams, Route, NavLink} from "react-router-dom";
import { 
    Chip,
    Menu,
    MenuItem
} from '@material-ui/core';
//import Channels from './Channels';
import PostList from './PostList';
import { Fire } from 'mdi-material-ui';
import { useSelector } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Community(props) {

    // state
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // hooks
    const params = useParams();

    // redux
    const redux = useSelector(state => state);

    const Label = ({trend}) => {
        if(!trend) return 'Popular';
        else if(trend === 'day') return 'Popular Daily';
        else if(trend === 'week') return 'Popular Weekly';
        else if(trend === 'month') return 'Popular Monthly';
        else return 'Uh oh';
    }

    return (
        <div className="col-md-6 col-12 mb-3">
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <Chip
                        icon={<CreateIcon/>}
                        label="Create"
                        color="primary"
                        clickable
                        onClick={(e) => setAnchorEl2(e.currentTarget)}
                        disabled={!redux.app.loggedin}
                    />
                    <Menu
                        variant={'menu'}
                        anchorEl={anchorEl2}
                        keepMounted={false}
                        open={Boolean(anchorEl2)}
                        onClick={() => setAnchorEl2(null)}
                    >
                        <MenuItem
                            component={ForwardNavLink}
                            to="/community/new/post"
                            onClick={() => setAnchorEl2(null)}
                            >
                            New Post
                        </MenuItem>
                        <MenuItem
                            component={ForwardNavLink}
                            to="/community/new/article"
                            onClick={() => setAnchorEl2(null)}
                            >
                            New Article
                        </MenuItem>
                    </Menu>
                </div>
                <div>
                    <Chip
                        label="Recent"
                        size="small"
                        className="mr-3"
                        color="secondary"
                        variant={!params.trend ? "default" : "outlined"}
                        clickable
                        component={ForwardNavLink}
                        to="/community"
                    />
                    <Chip
                        icon={<Fire />}
                        label={<Label trend={params.trend}/>}
                        variant={!params.trend ? "outlined" : "default"}
                        size="small"
                        color="secondary"
                        clickable
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                </div>
                
            </div>
            <Menu
                variant={'menu'}
                anchorEl={anchorEl}
                keepMounted={false}
                open={Boolean(anchorEl)}
                onClick={() => setAnchorEl(null)}
            >
                <MenuItem 
                    component={ForwardNavLink}
                    to="/community/top/day"
                    onClick={() => setAnchorEl(null)}
                    >
                    Day
                </MenuItem>
                <MenuItem
                    component={ForwardNavLink}
                    to="/community/top/week"
                    onClick={() => setAnchorEl(null)}
                    >
                    Week
                </MenuItem>
                <MenuItem
                    component={ForwardNavLink}
                    to="/community/top/month"
                    onClick={() => setAnchorEl(null)}
                    >
                    Month
                </MenuItem>
            </Menu>
            <Route exact path={'/community'} render={(props) => <PostList query={{ '_sort': 'createdAt:desc' }} {...props} />} />
            <Route exact path={'/community/top/:trend'} render={(props) => <PostList {...props} />} />

            {/*
            <div className="row">
                <div className="col-md-8 col-12 order-md-0 order-1">
                    <PostList
                        {...props}
                        query={{ '_sort': 'createdAt:desc' }}
                    />
                </div>
                
                <div className="col-md-4 col-12 order-md-1 order-0 mb-md-0 mb-3">
                    <Channels
                        {...props}
                    />
                </div>
            </div>
            */}
        </div>
    )

}
