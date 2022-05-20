import React from 'react';
import './conversations.css'

const Conversations = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='conversation'>
            <img className='convoImg' src="/assets/eren.jpg" alt="" />
            <span className='convoName'>A Friend</span>
        </div>
    );
}

export default Conversations;
