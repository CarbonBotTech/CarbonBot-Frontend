import React, { useContext } from "react";
import { Button, Typography } from '@material-ui/core';
import { AppContext } from './index'
//import { AppContext } from './context';
const Footer = ({comment}) => {

    // context
    const {state, dispatch} = useContext(AppContext);

    // methods  
    const toggleReplyForm = () => {
        dispatch({ type: 'TOGGLE_REPLY', payload: !state.reply});
    }

    return (
        <div className="footer">
            <div className="d-flex align-items-center">
                <a href="#" onClick={(e) => { e.preventDefault(); toggleReplyForm() }} style={{fontSize: '13px'}}>
                    <strong>{state.reply ? <span>Cancel</span> : <span>Reply</span>}</strong>
                </a>
            </div>
        </div>
    )
}

export default Footer;