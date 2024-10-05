import React, { useEffect, forwardRef, Fragment, useState } from "react";
import { 
    Breadcrumbs, 
    Typography,
    Divider,
    Paper,
    ListItemIcon,
    List,
    ListSubheader,
    ListItem,
    ListItemText
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, NavLink, Route } from 'react-router-dom';
import { getCompany } from '../helpers/manageCompany';
import Avatar from '../components/Avatar';
import { useSelector } from 'react-redux';
import { Robot } from 'mdi-material-ui';
import { Bots } from './index';
import Links from '../components/Links';
import Poster from './../components/Poster';
import './../sass/Company.scss';

const ForwardNavLink = forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

const InfoBlock = ({company}) => {
    return (
        <Fragment>
            <Paper elevation={0} variant="outlined" className="mb-3">
                <List
                    dense
                    component="div"
                    aria-labelledby="channels-subheader"
                    subheader={
                        <ListSubheader component="div" id="channels-subheader" disableSticky={true}>
                            Discover
                        </ListSubheader>
                    }
                    >  
                        <ListItem
                            exact
                            component={ForwardNavLink}
                            to={"/company/" + company.slug}
                            activeClassName={"Mui-selected"}
                            button
                        >
                            <ListItemIcon>
                                <Robot style={{opacity: 0.6}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Bots"} />
                        </ListItem>
                        <Divider/>
                </List>
            </Paper>
            <Links property={company}/>
        </Fragment>
    )
}

export default function Company({match}) {

    // state
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    // redux
    const redux = useSelector(state => state);

    // lifecycle
    useEffect(() => {
        handleGetCompany(match.params.slug)
    },[match.params.slug])

    // methods
    const handleGetCompany = async(slug) => {
        let parsed_query = new URLSearchParams({
            slug: slug
        }).toString();
        const [error, response] = await getCompany(parsed_query);
        if(error) {
            return;
        }
        setCompany(response.data[0]);
        setLoading(false);
        
    }

    if(loading) return null;

    return (
        <Fragment>
            <div className="col-md-9 col-12 mb-3 company">

                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className="mb-3">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    {/*
                    <Link color="inherit" to="/companies">
                        Company
                    </Link>
                    */}
                    <Typography color="textPrimary">Company</Typography>
                </Breadcrumbs>

                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className="header mb-3">
                            {
                                company.poster && <Poster src={company.poster}/>
                            }
                            <div className="info-wrapper d-flex">
                                <Avatar
                                    company={company}
                                    size={85}
                                />
                                <div className="ml-3 info">
                                    <Typography variant="h5">
                                        {company.name}
                                    </Typography>
                                    <Typography variant="body1" className="my-1 clamp">
                                        {company.tagline}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="d-md-none d-block mb-md-0 mb-3">
                            <InfoBlock
                                company={company}
                            />
                        </div>
                        <Route exact path={'/company/:slug'} render={(props) => <Bots company_id={company._id} {...props} />} />
                    </div>

                    <div className="col-md-4 d-md-block d-none">
                        <InfoBlock
                            company={company}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}