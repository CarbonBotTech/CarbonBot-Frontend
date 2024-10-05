import React, { Fragment, memo } from "react";
import { Chip, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff'
    },
}))(Tooltip);

const RenderPlatforms = ({source,max,promote}) => {
    /**
     * Promote item by moving it up in the array
     */
    if(promote) {
        let itemIndex = source.findIndex(item => item.slug === promote); 
        source.splice(
            0,
            0,                           
            source.splice(itemIndex, 1)[0]
        );
    }

    /**
     * Split the array for the "plus" part
     */
    let split = [ ...source ].splice(max);
    
    return (
        <Fragment>
            {
                source.map((platform, index) => {
                    if(index < max) {
                        return (
                            <Chip 
                                key={platform._id}
                                label={platform.name} 
                                variant="outlined"
                                size="small"
                                className="mr-1 mt-1"
                                color="primary"
                            />
                        )
                    }
                })
            }
            {
                source.length - max > 0 && (
                    <Fragment>
                        <HtmlTooltip
                            placement="top"
                            title={
                                <React.Fragment>
                                    <ul className="p-0 m-0">
                                        {
                                            split.map((item) => {
                                                return (
                                                    <li key={item._id}>{item.name}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </React.Fragment>
                            }
                        >
                            <Chip 
                                label={`+${source.length - max} more`}
                                variant="outlined"
                                style={{
                                    border: 'none',
                                    marginLeft: '-4px'
                                }}
                                size="small"
                                className="mt-1"
                            />  
                        </HtmlTooltip>
                    </Fragment>
                )    
            }
        </Fragment>
    )
}

export default memo(RenderPlatforms);

