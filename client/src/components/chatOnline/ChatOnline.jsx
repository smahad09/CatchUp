import React from 'react';
import './chatOnline.css'


const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/chatApp.jpg" alt="" className='chatOnlineImg' />
                    <div className="chatOnlineBadge"></div>
                </div>
                John Doe
            </div>
            
        </div>
    );
}

export default ChatOnline;
