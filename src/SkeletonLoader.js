import React, { Fragment } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { 
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';

export default function SkeletonLoader() {

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row app-header align-items-center">
                    <div className="col-6 d-flex align-items-center">
                        <Skeleton
                            animation="wave" 
                            variant="rect"
                            width={30} 
                            height={30} 
                            style={{borderRadius: 6}}
                        />
                        <Skeleton
                            animation="wave" 
                            variant="rect"
                            width={110} 
                            height={22 } 
                            style={{borderRadius: 4}}
                            className="ml-3"
                        />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <Skeleton
                            animation="wave" 
                            variant="rect"
                            width={103} 
                            height={30} 
                            style={{borderRadius: 6}}
                            className="mr-3"
                        />
                        <Skeleton
                            animation="wave" 
                            variant="circle"
                            width={45} 
                            height={45}
                        />
                    </div>
                </div>
            </div>
            <div className="container-fluid h-100 px-0 wrapper">
                <div className="row h-100 mx-0">
                    <div className="col-md-3 d-none d-md-block sidebar p-0">
                        <List dense component="nav">
                            <ListItem className="mb-1">
                                <ListItemIcon>
                                    <Skeleton width={25} height={15} style={{borderRadius: 5}}/>
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Skeleton width={"100%"} height={15} style={{borderRadius: 5}}/>} 
                                    disableTypography={true}
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem className="my-1">
                                <ListItemIcon>
                                    <Skeleton width={25} height={15} style={{borderRadius: 5}}/>
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Skeleton width={"100%"} height={15} style={{borderRadius: 5}}/>} 
                                    disableTypography={true}
                                />
                            </ListItem>
                            <Divider/>
                        </List>
                    </div>
                    <div className="col-md-9 col-12 content">
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 col-12 d-flex">
                                <Skeleton width={50} height={25} style={{borderRadius: 6}}/>
                                <Skeleton width={20} className="mx-3" height={25} style={{borderRadius: 6}}/>
                                <Skeleton width={90} height={25} style={{borderRadius: 6}}/>
                            </div>
                            <div className="col-md-8 col-12 d-flex mt-1">
                                <Skeleton width={50} height={50} style={{borderRadius: 6}}/>
                            </div>
                            <div className="col-md-8 col-12 d-flex mt-3">
                                <Skeleton
                       
                                    variant="rect"
                                    width={135} 
                                    height={30} 
                                    style={{borderRadius: 6}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}
