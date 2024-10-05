import React, { useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import {Typography,IconButton,Tabs,Tab} from '@material-ui/core';
import { CollectionForm } from './../../Collection';
import BotList from './../../Bot/BotList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </div>
    );
}

export default function EditCollection(props) {

    // state
    const [tab, setTab] = useState(0);

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
                        to="/settings/collections/"
                        >
                        <ArrowBackIcon />
                    </IconButton>
                    <strong className="ml-2">Edit Collection</strong>
                </Typography>
            </div>
            <div className="col-md-10 col-12">
                <Tabs className="mb-3" value={tab} onChange={(e, newTab) => setTab(newTab)} aria-label="Bot edit tabs">
                    <Tab label="Information" />
                    <Tab label="Bots" />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <CollectionForm 
                        {...props} 
                        id={props.match.params.id}
                        mode={"edit"}
                    />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <BotList
                        query={{ '_sort': 'createdAt:desc' }}
                        {...props}
                        mode="edit_collection"
                        collection_id={props.match.params.id}
                    />
                </TabPanel>
            </div>
        </div>
    )
}
