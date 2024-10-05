import React from "react";
import BotList from './Bot/BotList';
import { useSelector } from 'react-redux';
import { 
    Breadcrumbs, 
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Platform(props) {
    
    // redux
    const app = useSelector(state => state);
    
    // methods
    const FindPlatformName = ({slug}) => {
        let find_platform = app.platforms.find(platform => platform.slug === slug);
        if(find_platform) {
            return find_platform.name;
        }
        return "All";
    }

    return (

        <div className="col-md-8 col-12">
            <div className="mb-3">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                    {
                        props.match.params.slug ? (
                            <Link color="inherit" to="/directory/">Directory</Link>
                        ) : (
                            <Typography color="textPrimary">Directory</Typography>
                        )
                    }
                </Breadcrumbs>
                <Typography variant="h4" className="mt-1">
                    <FindPlatformName slug={props.match.params.platform}/>
                </Typography>
            </div>
            <BotList
                {...props}
                query={{ '_sort': 'createdAt:desc' }}
                promote={props.match.params.platform}
            />
        </div>

        
    )

}
