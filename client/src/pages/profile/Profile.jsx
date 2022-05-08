import React, { Component } from 'react';
import './profile.css'
import Navbar from "../../components/navbar/Navbar"
import ChatMenu from '../../components/chatMenu/ChatMenu';

class Profile extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="profile">
                    <div className="profileLeft">
                        <ChatMenu /> 
                    </div>

                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src="/assets/erere.bmp" alt="" className='coverImage' />
                                <img src="/assets/eren.jpg" alt="" className='profileImage' />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileName'>Eren Yeager</h4>
                                <span className="profileStatus">Hear Me Subjects of Ymir</span>
                            </div>
                        </div>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                        <h1>Heading</h1>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
