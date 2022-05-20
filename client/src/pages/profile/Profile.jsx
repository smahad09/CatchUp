import React, { Component, useEffect, useState } from 'react';
import './profile.css'
import Navbar from "../../components/navbar/Navbar"
import ChatMenu from '../../components/chatMenu/ChatMenu';
import axios from 'axios';
import {useParams} from 'react-router';


const Profile = ()=> {
    const [userData,setuserData] = useState({});
    const [followers,setFollowers] = useState([]);
    const [followings,setFollowings] = useState([]);
    const username = useParams().username

    useEffect(()=> {
        const fetchUser = async()=> {
            const response = await axios.get(`http://localhost:3001/users?username=${username}`);
            setuserData(response.data);
            setFollowers(response.data.followers);
            setFollowings(response.data.followings);
        }; fetchUser();
    }, [username]); 

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
                                <img src={userData.coverPicture || "/assets/noCP.png"} alt="" className='coverImage' />
                                <img src={userData.profilePicture || "/assets/noPP.png"} alt="" className='profileImage' />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileName'>{userData.username}</h4>
                                <span className="profileStatus">{userData.status}</span>
                                <span className="profileFollowings">
                                     {followers.length} <span className='follow'>Followers </span>
                                     {followings.length} <span className="follow">Following</span>  
                                </span>
                            </div>
                            <div className="followbutton">
                                <button>Follow User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
}

export default Profile;
