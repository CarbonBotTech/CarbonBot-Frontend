import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { 
    Typography,
    Divider
} from '@material-ui/core';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
hashtag(linkify);

class StoryParser extends Component {

    constructor(props) {

        super(props);

        this.state = {

        }

    }

    prepHashrags(value, type) {

        let text;
        if(type == 'hashtag') {
            text = <Link to={'/tags/' + value.replace('#','')}>{value}</Link>
        } else {
            text = value;
        }

        return text;
    }

    componentDidMount() {

        //window.iframely && window.iframely.load();

    	const node = ReactDOM.findDOMNode(this);

    	if (node instanceof HTMLElement) {
			var child = node.querySelector('#tag');
			if(child) {
				child.addEventListener('click', (e) => {
					e.preventDefault();
					this.props.history.push( e.target.getAttribute("tag") )
				});
			}

		}
    	
    }

    getIframelyHtml(html) {
        return {__html: html};
    }

    SharedContent(content) {

        if(content.meta.html) {

            let html = content.meta.html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')

            return <div className="embed-holder iframely" dangerouslySetInnerHTML={this.getIframelyHtml(html)} />
        }

        return (
            <p>Unknown Link</p>
        )

    }
  
    renderBlock(block) {

    	if(block.type == 'paragraph') {

    		let original_text = block.data.text.replace(/&nbsp;/gi,'').replace(/#(\S*)/g,'<a tag="/tags/$1" id="tag" href="/tags/$1">#$1</a>');
    		return <Typography variant="body2" className="mb-1" dangerouslySetInnerHTML={{ __html: original_text }}/>


    	} else if(block.type == 'header') {

    		switch(block.data.level) {
    			case 3:
    				return (<Typography variant="body1" className="mb-1"><strong>{block.data.text}</strong></Typography>)
    		}

    	} else if(block.type == 'list') {
    		switch(block.data.style) {
    			case "ordered":
    				return (
    					<ol>
    						{
	    					block.data.items.map(
		                        (Item) =>
		                            <li key={ Math.random() }><Typography variant="body2">{ Item }</Typography></li>
		                        ) 
		                	}
    					</ol>
    				)
    				break;
    			case "unordered":
    				return (
    					<ul>
    						{
	    					block.data.items.map(
		                        (Item) =>
		                            <li key={ Math.random() }><Typography variant="body2">{ Item }</Typography></li>
		                        ) 
		                	}
    					</ul>
    				)
    				break;

    		}

    	} else if(block.type == 'delimiter') {

    		return <Divider className="mb-3"/>

    	} else if(block.type == 'image') {

            if(!block.data.file) {
                return null;
            }

    		return (
                <div className={"image-holder" + (block.data.withBorder ? ' with-border' : '') + (block.data.stretched ? ' stretched' : '') + (block.data.withBackground ? ' with-background' : '')}>
                    <img className="img-fluid" alt="" src={block.data.file.url}/>
                    {
                        (block.data.caption) ? (
                            <Typography variant="caption">{block.data.caption}</Typography>
                        ) : null
                    }
                </div>
    		)

    	} else if(block.type == 'linkTool') {

            return this.SharedContent(block.data); 
            

        }

    	else {
    		return (
    			<p>Unknown block:(</p>
    		)
    	}
    }
    
    render() {

    	return this.renderBlock(this.props.block);

    }

}

function mapStateToProps(state) {

    return { 
        app: state.app
    };
    
}


export default withRouter(connect(mapStateToProps, {})(StoryParser));