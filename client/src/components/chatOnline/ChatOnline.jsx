import React, { useEffect, useState } from 'react';
import './chatOnline.css';
import axios from 'axios';


const ChatOnline = ({onlineUsers, currentUser, setCurrentChat}) => {
    const [friends,setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);


    useEffect(()=> {
        const getFriends = async()=> {
            try {
                const response = await axios.get('http://localhost:3001/users/friends/'+currentUser);
                setFriends(response.data);
            } catch(err) {console.log(err)}
        };
        getFriends();
    }, [currentUser])

    useEffect(()=> {
        setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));
    },[friends,onlineUsers])

    const handleClick = async(user)=> {
        try {
            const response = await axios.get('http://localhost:3001/conversation/find/'+currentUser+'/'+user._id);
            setCurrentChat(response.data);
        }catch(err) {console.log(err)}
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map((o)=> (
                <div className="chatOnlineFriend" onClick={()=> handleClick(o)}>
                <div className="chatOnlineImgContainer">
                    <img src={o?.profilePicture || "/assets/noPP.png"} alt="" className='chatOnlineImg' />
                    <div className="chatOnlineBadge"></div>
                </div>
                    {o.username}
                </div>
            ))}
        </div>
    );
}

export default ChatOnline;
