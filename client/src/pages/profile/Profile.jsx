import React, { Component, useContext, useEffect, useState } from 'react';
import './profile.css'
import Navbar from "../../components/navbar/Navbar"
import ChatMenu from '../../components/chatMenu/ChatMenu';
import axios from 'axios';
import {useParams} from 'react-router';
import { AuthContext } from '../../context/authContext';
import AddIcon from '@mui/icons-material/Add';


const Profile = ()=> {
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [userData,setuserData] = useState({});
    const [followers,setFollowers] = useState([]);
    const [followings,setFollowings] = useState([]);
    const [followed,setFollowed] = useState(currentUser?.followings.includes(userData._id));
    const username = useParams().username

    const [imgUrl, setImgUrl] = useState(null);

    useEffect(()=> {
        const fetchUser = async()=> {
            const response = await axios.get(`http://localhost:3001/users?username=${username}`);
            setuserData(response.data);
            setFollowers(response.data.followers);
            setFollowings(response.data.followings);
        }; fetchUser();
    }, [username]); 


    useEffect(()=> {
        setFollowed(currentUser.followings.includes(userData._id))
    }, [currentUser, userData._id])

    const followHandler = async()=> {
        try {
            if (followed) {
                await axios.put('http://localhost:3001/users/'+userData._id+'/unfollow', {userId:currentUser._id});
                dispatch({type:"UNFOLLOW", payload:userData._id})
            } else {
                await axios.put('http://localhost:3001/users/'+userData._id+'/follow', {userId:currentUser._id});
                dispatch({type:"FOLLOW", payload:userData._id})
            }
        } catch(err) {console.log(err);}
        setFollowed(!followed)
    }


    const handleImageUpload = async () => {
        const { files } = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'catchUp');
        const options = {
            method: 'POST',
            body: formData
        }
        await fetch('https://api.Cloudinary.com/v1_1/dlqh4h7sk/image/upload', options)
                .then(response=> response.json())
                .then(response=> { setImgUrl(response.url)
                        console.log(response.url);
                })
    }
            
    useEffect(()=> {
        const updateProfile = async()=> {
            const response = await axios.put(`http://localhost:3001/users/${currentUser._id}`, {
                userId: currentUser._id,
                profilePicture: imgUrl
            });
        }
        updateProfile(); 
    }, [imgUrl])
    
    
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
                                <img src={imgUrl || "/assets/noPP.png"} alt="" className='profileImage' />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileName'>{userData.username}</h4>
                                <span className="profileStatus">{userData.status}</span>
                                <span className="profileFollowings">
                                     {followers?.length} <span className='follow'>Followers </span>
                                     {followings?.length} <span className="follow">Following</span>  
                                </span>
                                {username !== currentUser.username && (
                                    <div>
                                        <button className="followButton" onClick={followHandler}>
                                            {currentUser.followings.includes(userData._id)? "Unfollow": "Follow"}
                                        </button>
                                    </div>
                                )}
                                {username === currentUser.username && (
                                    <div>
                                        <input type="file" name="profile" id="profile" />
                                        <button onClick={handleImageUpload}>Change Profile</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
}

export default Profile;
