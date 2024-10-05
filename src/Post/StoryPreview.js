import React, { useEffect,  Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { 
    Typography
} from '@material-ui/core';
import config from "./../config";

const StoryPreview = ({post}) => {

    const [state, setState] = useState({
        preview_text: null,
        preview_image: null
    });

    useEffect(() => {
        let find_paragraphs = post.content.blocks.filter((block) => block.type === 'paragraph');
        let find_images = post.content.blocks.filter((block) => block.type === 'image');
        let preview_text = null, preview_image = null;

        if(find_paragraphs.length > 0) {
            preview_text = find_paragraphs[0]['data']['text'];
        }

        if(find_images.length > 0) {
            preview_image =  find_images[0]['data']
        }

        setState({
            preview_text: preview_text,
            preview_image: preview_image
        })
    },[]);

    const ContinueReading = ({text}) => {
        if(text.length > config.TRUNCATE_POST) {
            let truncated = text.substr(0, config.TRUNCATE_POST) + '...';
            return <Typography className="d-inline" variant="body2" dangerouslySetInnerHTML={{ __html: truncated }}/>
        }
        return <Typography className="d-inline" variant="body2" dangerouslySetInnerHTML={{ __html: text }}/>
    }

    return (
        <div className="preview">
            {
                state.preview_image && (
                    <div className={"image-holder" + (state.preview_image.withBorder ? ' with-border' : '') + (state.preview_image.stretched ? ' stretched' : '') + (state.preview_image.withBackground ? ' with-background' : '')}>
                        <Link to={"/community/" + post.user.username + "/" + post._id}>
                            <img className="img-fluid" alt="" src={state.preview_image.file.url}/>
                        </Link>
                        {
                            (state.preview_image.caption) ? (
                                <Typography variant="caption">{state.preview_image.caption}</Typography>
                            ) : null
                        }
                    </div>
                )
            }
            { state.preview_text && (
                <Fragment>
                    <ContinueReading text={state.preview_text}/>
                </Fragment>
            ) }
        </div>
    )
}

export default StoryPreview;

