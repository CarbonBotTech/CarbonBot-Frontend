import React from "react";
import { NavLink } from 'react-router-dom';
import { 
    ListSubheader,
    List,
    ListItem,
    ListItemText,
    Paper,
    ListItemAvatar
} from '@material-ui/core';
import Avatar from '../components/Avatar';

const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function Developer({user, company, title}) {
    return (
        <Paper elevation={0} variant="outlined" className="mb-3">
            <List
                dense
                component="div"
                aria-labelledby="bot-info-subheader"
                subheader={
                    <ListSubheader component="div" id="bot-info-subheader" disableSticky={true}>
                        {title}
                    </ListSubheader>
                }
                >
                    {
                        company ? (
                            <ListItem
                                component={ForwardNavLink}
                                to={"/company/" + company.slug}
                                button
                            >
                                <ListItemAvatar>
                                    <Avatar size={40} company={company} link={false}/>
                                </ListItemAvatar>
                                <ListItemText primary={company.name} />
                            </ListItem>
                        ) : (
                            <ListItem
                                component={ForwardNavLink}
                                to={"/u/" + user.username}
                                button
                            >
                                <ListItemAvatar>
                                    <Avatar size={40} user={user} link={false}/>
                                </ListItemAvatar>
                                <ListItemText primary={user.profile && user.profile.display_name ? user.profile.display_name : user.username} />
                            </ListItem>
                        )
                    }
                    
                    
            </List>
        </Paper>
    )

}
