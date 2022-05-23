import React from 'react';
import './messages.css';
import {format} from 'timeago.js'

const Messages = ({message,own}) => {
    return (
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img src="/assets/eren.jpg" alt="" className="messageImg" />
                <p className="messageText">{message.text}</p>
            </div>

            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    );
}

export default Messages;
