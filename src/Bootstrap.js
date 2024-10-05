import React, { useEffect, useState, Fragment } from "react";
import Navigation from './components/Navigation';
import { getCurrentUser } from './helpers/manageUser';
import { useSelector, useDispatch } from 'react-redux';
import { RestoreUser } from './store/actions/app.js';
import { GetPlatforms } from './store/actions/platforms.js';
import { GetCategories } from './store/actions/categories.js';
import { GetChannels } from './store/actions/channels.js';
import { withRouter } from 'react-router-dom';
import { getAssets } from './helpers/manageAssets';
import LeftSidebar from './components/LeftSidebar';
import SkeletonLoader from './SkeletonLoader';

const Bootstrap = (props) => {

    // state
    const [loading,setLoading] = useState(true);

    // redux
    const app = useSelector(state => state.app);
    const dispatch = useDispatch();
    
    // lifecycle
    useEffect(() => {
        handleLogin();
    },[]);

    // methods
    const handleLogin = async () => {

        /**
         * Preload categories & platforms and cache 
         * them in the redux store
         */
        const [error,response] = await getAssets();
        if(error) {
            return;
        }
        dispatch( GetPlatforms(response.data.platforms) );
        dispatch( GetCategories(response.data.categories) );
        dispatch( GetChannels(response.data.channels) );

        /**
         * Check if the users auth token was saved 
         * and whether they should be logged in or not
         */
        const token = localStorage.getItem("token"); // look in localStoarge for the auth token
        if(token && app.loggedin) {
            // loggedin just now, coming from Login page
            setLoading(false);
            return;
        }

        if(!token && !app.loggedin) {
            // not loggedin at all
            setLoading(false);
            return;
        }

        if(token && !app.loggedin) {
            // The user was loggedin at some point; restore the session by calling users profile endpoint
            const [error,response] = await getCurrentUser(token);
            if(error) {
                // token was busted. Clean up everything
                localStorage.removeItem("token");
                setLoading(false);
                return;
            }
            dispatch( RestoreUser(response.data, token) );
            setLoading(false); // disable loading
        }

    }

    return (
        <Fragment>
            {
                loading ? <SkeletonLoader/> : (
                    <Fragment>
                        <Navigation {...props}/>
                        <div className="container-fluid h-100 px-0 wrapper">
                            <div className="row h-100 mx-0">
                                <div className="col-md-3 d-none d-md-block sidebar-wrapper px-0">
                                    <LeftSidebar 
                                        {...props}
                                    />
                                    
                                </div>
                                <div className="col-md-9 col-12 content">
                                    <div className="row justify-content-center mt-3">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default withRouter(Bootstrap);
