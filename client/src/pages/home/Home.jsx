import React, { Component } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import Messages from '../../components/messages/Messages';
import Navbar from '../../components/navbar/Navbar';
import './home.css'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="messenger">
                    <div className="chatMenu">
                        <ChatMenu />
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
};


export default Home;