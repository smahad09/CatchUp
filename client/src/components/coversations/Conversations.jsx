import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './conversations.css'

const Conversations = ({conversation, currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user,setUser] = useState(null);

    console.log(conversation)

    // useEffect(()=>{
    //     const friendId = conversation.members.find((m) => m!==currentUser._id);
    //     const getUser = async()=> {
    //         try {
    //             const response = await axios('http://localhost:3001/users?userId='+friendId);
    //             console.log(response);
    //         } catch(err) {console.log(err)}
    //     };
    //     getUser();
    // },[currentUser, conversation])

    return (
        <div className='conversation'>
            <img className='convoImg' src="/assets/eren.jpg" alt="" />
            <span className='convoName'>A Friend</span>
        </div>
    );
}

export default Conversations;
