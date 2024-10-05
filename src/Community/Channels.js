import React, { useEffect, useReducer, forwardRef, Fragment, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { 
    Breadcrumbs, 
    Typography,
    Divider,
    Paper,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    List,
    ListSubheader,
    ListItem,
    ListItemText
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, NavLink } from 'react-router-dom';
import Avatar from './../components/Avatar';
import { useSelector } from 'react-redux';
import { NewspaperVariantOutline } from 'mdi-material-ui';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Channels(props) {

    // hooks
    const match = useRouteMatch("/community/:channel");

    // redux
    const redux = useSelector(state => state);
    
    return (
        <Fragment>
            <Paper elevation={0} variant="outlined">
                <List
                    dense
                    component="div"
                    aria-labelledby="channels-subheader"
                    subheader={
                        <ListSubheader component="div" id="channels-subheader" disableSticky={true}>
                            Channels
                        </ListSubheader>
                    }
                    >   
                        <ListItem
                            component={ForwardNavLink}
                            to={"/community"}
                            activeClassName={!match ? "Mui-selected" : ''}
                            button
                        >
                            <ListItemIcon>
                                <NewspaperVariantOutline/>
                            </ListItemIcon>
                            <ListItemText primary={"Recent"} />
                        </ListItem>
                        <Divider/>
                        {
                            redux.channels.map((item,index) => {
                                return (
                                    <Fragment key={item._id}>
                                        <ListItem
                                            activeClassName={"Mui-selected"}
                                            component={ForwardNavLink}
                                            to={"/community/" + item.slug}
                                            key={index}
                                            button
                                        >
                                            <ListItemIcon>
                                                <NewspaperVariantOutline/>
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                        { index < redux.channels.length - 1 && <Divider/> }
                                    </Fragment>
                                )
                            })
                        }
                </List>
            </Paper>
        </Fragment>
    )

}
