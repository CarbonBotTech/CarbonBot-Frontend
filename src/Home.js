import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { getBots } from './helpers/manageBots';
import './sass/Featured.scss';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Home(props) {
    
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);

    // lifecycles
    useEffect(() => {
        //handleGetBots();
    },[]);

    const handleGetBots = async () => {
        const [error, response] = await getBots('_start=0&_limit=15&_sort=createdAt%3Adesc&featured=true');
        setLoading(false);
        if(error) {
            return;
        }
        setBots(response.data.bots);
        setLoading(false);
    }
    return (
        <Fragment>
            <div className="col-md-8 col-12 featured">
   
            </div>
        </Fragment>
        
    )

}