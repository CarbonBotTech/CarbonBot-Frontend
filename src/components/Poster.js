import React, { Fragment } from "react";
import './../sass/Poster.scss';
import placeholder from './../assets/poster-placeholder.png'


const Poster = ({children,src,height}) => {

    let image_src = src ? src : placeholder

    return (
        <Fragment>
            <div 
                className="poster d-flex align-items-end justify-content-end mb-3 p-3"
                style={{
                    backgroundImage: "url(" + image_src + ")",
                    height: height ? height : '250px'
                }}
                >
                    {children}
            </div>
        </Fragment>
        
    )

}

export default Poster;