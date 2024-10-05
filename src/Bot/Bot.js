import React, { useEffect, Fragment, useState } from "react";
import { 
    Breadcrumbs, 
    Typography,
    Divider,
    Paper,
    Button,
    Menu,
    MenuItem,
    ListItemIcon
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import { findBotById } from '../helpers/manageBots';
import Avatar from '../components/Avatar';
import './../sass/Bot.scss';
import RenderPlatforms from '../components/RenderPlatforms';
import Developer from './Developer';
import Links from '../components/Links';
import ReviewList from './../Review/ReviewList';
import { useSelector } from 'react-redux';
import Collection from './Collection';
import Error from './../components/Error';
import { parseErrors } from './../helpers/parseErrors';

export default function Bot(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [bot, setBot] = useState(null);
    const [collection_modal, setCollectionModal] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // redux
    const redux = useSelector(state => state);

    // lifecycles
    useEffect(() => {
        handleGetBot(props.match.params.slug)
    },[props.match.params.slug])

    // methods
    const handleGetBot = async (slug) => {
        if(props.location?.state && slug === props.location?.state?.slug) {
            setBot(props.location.state)
            setLoading(false);
            return;
        }
        const [error, response] = await findBotById(slug);
        if(error) {
            const api_errors = parseErrors(error.response);
            setError(api_errors);
            setLoading(false);
            return;
        }
        setBot(response.data);
        setLoading(false);
    }

    const FindPlatformName = ({slug}) => {
        let platform = redux.platforms.find(platform => platform.slug === slug);
        if(platform) {
            return (
                <Fragment>
                    <ListItemIcon>
                        <img width="20" height="100%" src={platform.logo} alt={`Logo of ${platform.name}`}/>
                    </ListItemIcon>
                    <Typography variant="body1">
                        {platform.name}
                    </Typography>
                </Fragment>
            )
        }
        return null;
    }

    if(loading) return null;
    
    if(!loading && error) {
        return (
            <div className="col-md-10 col-12">
                <Error error={error} />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="col-md-10 col-12 mb-3">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    <Typography color="textPrimary">Bot</Typography>
                </Breadcrumbs>
            </div>
            <div className="col-md-10 col-12 d-flex mb-3">
                <Avatar
                    bot={bot}
                    size={97}
                />
                <div className="ml-3">
                    <Typography variant="h5">
                        {bot.name}
                    </Typography>
                    <Typography variant="body1" className="my-1">
                        {bot.tagline}
                    </Typography>
                    <div className="d-flex align-items-center">
                        <Rating precision={1} value={bot.rating} readOnly /><Typography variant="caption" className="ml-2">{bot.reviews} reviews</Typography>
                    </div>
                </div>
            </div>
            <div className="col-md-10 col-12 mb-3">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="w-100 mb-3 d-md-none d-block"
                    onClick={(event) => {setAnchorEl(event.currentTarget)}}
                >
                    Install
                </Button>
                <Button
                    variant="outlined"
                    color="default"
                    size="large"
                    className="w-100 mb-3 d-md-none d-block"
                    onClick={(event) => {setCollectionModal(true)}}
                    disabled={!redux.app.loggedin}
                >
                    Add to collection
                </Button>
                <div className="row">
                    <div className="col-md-8 col-12">
                        <Paper className="p-3">
                            <Typography variant="subtitle1" className="mb-2">
                                About
                            </Typography>
                            <Typography variant="body2">
                                {bot.about}
                            </Typography>
                            {
                                bot.tags?.length > 0 && (
                                    <div className="mt-2">
                                            
                                        {bot.tags?.map((tag, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <Link className="mr-1" to={"/tag/" + tag}>#{tag}</Link>
                                                </Fragment>
                                            );
                                        })}
                                    </div>
                                )
                            }
                            <Divider className="my-3"/>
                            <Typography variant="subtitle1" className="mt-3 mb-2">
                                Supported Platforms
                            </Typography>
                            <RenderPlatforms 
                                source={bot.platforms} 
                                max={5} 
                                promote={''}
                            />
                            <Typography variant="subtitle1" className="mt-3 mb-2">
                                Categories
                            </Typography>
                            <RenderPlatforms 
                                source={bot.categories} 
                                max={5} 
                                promote={''}
                            />
                        </Paper>
                    </div>
                    <div className="col-md-4 col-12 mt-3 mt-md-0">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="w-100 mb-3 d-md-block d-none"
                            onClick={(event) => {setAnchorEl(event.currentTarget)}}
                        >
                            Install
                        </Button>
                        <Button
                            variant="outlined"
                            color="default"
                            size="large"
                            className="w-100 mb-3 d-md-block d-none"
                            onClick={(event) => {setCollectionModal(true)}}
                            disabled={!redux.app.loggedin}
                        >
                            Add to collection
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted={false}
                            open={Boolean(anchorEl)}
                            onClose={() => { setAnchorEl(null); }}
                        >
                            {
                                bot.links.map((link,index) => {
                                    return (
                                        <MenuItem 
                                            href={link.url}
                                            component={'a'}
                                            target="_blank"
                                            onClick={() => { setAnchorEl(null); }}
                                            key={index}
                                            >
                                            <FindPlatformName slug={link.service}/>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                        <Developer user={bot.user} company={bot.company} title="Developer"/>
                        <Links property={bot}/>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 mb-3">
                <div className="row">
                    <div className="col-md-8 col-12">
                        <Typography variant="h6" className="mb-2">
                            Feeback & Reviews
                        </Typography>
                        {
                            redux.app.loggedin ? (
                                <ReviewList
                                    query={{ _sort: 'createdAt:desc', bot: bot._id, user_ne: redux.app.user._id }}
                                    mode="presentation"
                                />
                            ) : (
                                <ReviewList
                                    query={{ _sort: 'createdAt:desc', bot: bot._id }}
                                    mode="presentation"
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            {
                collection_modal && (
                    <Collection
                        bot_id={bot._id}
                        callback={() => {
                            setCollectionModal(false);
                        }}
                    />      
                )
            }
        </Fragment>
    )
}