import React, { useEffect, Fragment } from "react";
import { Typography } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const ParseLink = ({link}) => {

    useEffect(() => {
        window.iframely && window.iframely.load();
    },[])

    return (
        <div className="shared-content">
            {
                link.type === 'video' && (
                    <Fragment>
                        <div className="video-wrapper">
                            <div dangerouslySetInnerHTML={{ __html: link.html}}/>
                        </div>
                        <div className="rich-wrapper">
                            {
                                link.title && (
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <Typography variant="h6"><OpenInNewIcon className="icon-external-link"/>{link.title}</Typography>
                                    </a>
                                )
                            }
                            
                            {
                                link.provider_name && 
                                    <Typography variant="caption">{link.provider_name}</Typography>
                            }
                        </div>
                    </Fragment>
                )
            }
            {
                (link.type === 'rich' || link.type === 'link') && (
                    <div className="rich-wrapper">
                        {
                            link.thumbnail_url && (
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <img className="img-fluid w-100" src={link.thumbnail_url}/>
                                </a>
                            )
                        }
                        {
                            link.title && (
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <Typography variant="h6"><OpenInNewIcon className="icon-external-link"/>{link.title}</Typography>
                                </a>
                            )
                        }
                        {
                            link.provider_name && 
                                <Typography variant="caption">{link.provider_name}</Typography>
                        }
                    </div>
                )
            }
 
        </div>
    )
}

export default ParseLink;

