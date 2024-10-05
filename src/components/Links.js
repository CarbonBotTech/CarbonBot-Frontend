import React, { useEffect, useState, Fragment } from "react";
import { 
    ListSubheader,
    List,
    ListItem,
    ListItemText,
    Paper,
    ListItemIcon,
    Divider,
    Typography
} from '@material-ui/core';
import { Web, Twitter, Facebook, Linkedin } from 'mdi-material-ui';

export default function Links({property}) {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        if(!property) return;
        let social_links = [];
        let fields = ['linkedin','twitter','facebook','website'];
        Object.keys(property).forEach((key) => {
            if( fields.includes(key) && property[key] ) {
                social_links.push({
                    service: key,
                    url: property[key]
                });
            }         
        });
        setLinks(social_links)
    },[])

    return (
        <Paper elevation={0} variant="outlined">
            <List
                dense
                component="div"
                aria-labelledby="social-info-subheader"
                subheader={
                    <ListSubheader component="div" id="social-info-subheader" disableSticky={true}>
                        Links
                    </ListSubheader>
                }
                >   
                    {
                        links.map((link,index) => {
                            return (
                                <Fragment key={index}>
                                    <ListItem
                                        href={link.url}
                                        component={'a'}
                                        target="_blank"
                                        key={index}
                                        button
                                    >
                                        <ListItemIcon>
                                            {link.service === 'website' && <Web style={{opacity: 0.6}}/>}
                                            {link.service === 'twitter' && <Twitter style={{opacity: 0.6}}/>}
                                            {link.service === 'facebook' && <Facebook style={{opacity: 0.6}}/>}
                                            {link.service === 'linkedin' && <Linkedin style={{opacity: 0.6}}/>}
                                        </ListItemIcon>
                                        <ListItemText style={{textTransform: 'capitalize'}} primary={link.service} />
                                    </ListItem>
                                    { index < links.length - 1 && <Divider/> }
                                </Fragment>
                            )
                        })
                    }

                    {
                        (links.length === 0) && (
                            <>
                                <Typography variant="caption" align="center" className="d-block">
                                    Not available
                                </Typography>
                            </>
                        )
                    }
            </List>
        </Paper>
    )

}
