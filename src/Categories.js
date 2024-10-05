import React, { Fragment } from "react";
import { 
    Breadcrumbs, 
    Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './sass/Categories.scss';

export default function Categories(props) {

    // redux
    const redux = useSelector(state => state);
    
    return (
        <Fragment>
            <div className="col-md-8 col-12 mb-3">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Home
                    </Link>
                </Breadcrumbs>
                <Typography variant="h4" className="mt-1">
                    Categories
                </Typography>
            </div>
            <div className="col-md-8 col-12">
                <ul className="category-list">
                    {
                        redux.categories.map(category => {
                            return (
                                <li key={category._id} className="mb-1">
                                    <Typography variant="body1"><Link to={"/?_categories=" + category.slug}>{category.name}</Link></Typography>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Fragment>
    )

}
