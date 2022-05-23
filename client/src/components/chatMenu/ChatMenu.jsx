import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Conversations from '../coversations/Conversations';
import axios from 'axios';
import './chatMenu.css';

const ChatMenu = () => {

    const {user} = useContext(AuthContext);
    const [friends,setFriends] = useState([]);

    useEffect(()=> {
        const getFriends = async ()=> {
            try {
                const friendList = await axios.get("http://localhost:3001/users/friends/"+user._id);
                setFriends(friendList);
            } catch(err) {console.log(err);}
        }
        getFriends();
    }, [user._id])

    console.log(friends);

    return (
        <div className="messenger">
            
        </div>
       
    );
}

export default ChatMenu;
