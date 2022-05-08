import React from 'react';
import './messages.css';

const Messages = ({own}) => {
    return (
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img src="/assets/eren.jpg" alt="" className="messageImg" />
                <p className="messageText">Freedom</p>
            </div>

            <div className="messageBottom">
                1 hr ago
            </div>
        </div>
    );
}

export default Messages;
