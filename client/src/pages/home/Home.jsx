import React, { Component, useContext, useEffect, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import Messages from '../../components/messages/Messages';
import Conversations from '../../components/coversations/Conversations';
import Navbar from '../../components/navbar/Navbar';
import './home.css'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const Home = ()=> {

    const [conversations,setConversations] = useState([])
    const {user} = useContext(AuthContext);


    useEffect(()=> {
        const getConversations = async()=>{
            try {
                const response = await axios.get("http://localhost:3001/conversation/"+user._id)
                setConversations(response.data)
            }catch(err) {console.log(err)}
        }
        getConversations();
    },[user._id])

    return (
        <React.Fragment>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search Friends...' className='chatMenuSearch' />
                        <Conversations />
                        {conversations.map((c)=> (
                            <Conversations conversation={c}  currentUser={user} />
                        ))}     
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Messages own={false} />
                            <Messages own={true}/>
                            <Messages own={false} />
                            <Messages />
                            <Messages />    
                        </div>

                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='Message'></textarea>
                            <button className="sendMessageBtn">Send</button>
                        </div>
                    </div>
                </div>
                
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};



export default Home;