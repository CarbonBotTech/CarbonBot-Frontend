import React, { Fragment, useState, useEffect } from "react";
import { Chip, Popover, Button, List, ListItem, ListItemText, ListItemIcon, Divider, Checkbox, Badge } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import './../sass/CategoryFilter.scss';

const CategoryFilter = ({categories, onFilterApplied, onCleared, location}) => {
    
    // state
    const [anchorEl, setAnchorEl] = useState(null);
    const [checked, setChecked] = useState([]);

    // hooks
    const { enqueueSnackbar } = useSnackbar();

    // lifecycles
    useEffect(() => {

        /**
         * Convert the address bar ?categories= to the searchable params of CategoryFilter
         */

        let query = new URLSearchParams(location.search);
        let parsed_query = query.get('_categories');
        
        if(parsed_query) {
            let slugs = parsed_query.split(',');
            let params = [];
            for(let i in slugs) {
                let isChecked = checked.find((item) => item.slug === slugs[i]) ? true : false;
                let find_category = categories.find((item) => item.slug === slugs[i]);
                if(find_category && !isChecked && i <= 4) {
                    params.push(find_category)
                }
            }
            let _checked = [...checked, ...params];
            setChecked(_checked);
        }


    },[])

    // methods
    const handleToggle = (selected) => () => {
        let isChecked = checked.find((item) => item.id === selected.id) ? true : false;
        if(!isChecked && checked.length >= 5) {
            enqueueSnackbar("Too many categories were selected.", { 
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            return;
        }
        if (!isChecked) {
            setChecked([...checked, selected]);
        } else {
            let newChecked = checked.filter((item) => item.id !== selected.id);
            setChecked(newChecked);
        }
    };
    const handleDelete = (deleted) => {
        let newChecked = checked.filter((item) => item.id !== deleted.id);
        onFilterApplied(newChecked);
        setChecked(newChecked);
    }

    return (
        <Fragment>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onExited={() => {
                    onFilterApplied(checked)
                }}
            >
                <Fragment>
                    <div className="d-flex">
                        <List dense className="filter-list">
                            {
                                categories.map((category) => {
                                    return (
                                        <ListItem key={category._id} dense role={undefined} button onClick={handleToggle(category)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={
                                                        checked.find((item) => item.id === category.id) ? true : false
                                                    }
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ "aria-labelledby": category._id }}
                                                    className="p-0 ml-0"
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={category._id} primary={`${category.name}`} />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </div>
                    <Divider/>
                    <div className="px-3 py-3 text-right">
                        <Button
                            size="small"
                            onClick={(e) => {
                                setChecked([]);
                                onCleared();
                                setAnchorEl(null);
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            size="small"
                            className="ml-3"
                            disabled={checked.length === 0}
                            onClick={(e) => {
                                setAnchorEl(null);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </Fragment>
                
            </Popover>
            <div className="d-flex align-items-center">
                <div className="filter-list-toggle-button">

                    <Badge color="secondary" badgeContent={checked.length}>
                        <Button
                            variant="outlined"
                            size="small"
                            className="ml-0"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            Filter by Category
                        </Button>
                    </Badge>
                    
                </div>
                
                
                <div className="ml-3">
                    {
                        checked.map((item) => {
                            return (
                                <Fragment key={item._id}>
                                    <Chip
                                        className="mr-1 my-1"
                                        label={item.name}
                                        size="small"
                                        onDelete={() => handleDelete(item)}
                                    />
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
            
        </Fragment>
    )
}

export default CategoryFilter;

