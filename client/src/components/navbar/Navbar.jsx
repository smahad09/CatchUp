import React, { Component } from 'react';
import {Link, Navigate, Redirect, useNavigate} from 'react-router-dom';
import {Search, Person} from '@mui/icons-material'
import {useContext} from 'react';
import { AuthContext } from '../../context/authContext';
import './navbar.css'



const Navbar = ()=> {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = ()=> {
        localStorage.setItem("user", null);
        // navigate("/");
        window.location.reload();
    };

    //just adding to make a commit 
    return (
        <div className='navbar'>
            <div className="navbarLeft">
                <Link to='/' style={{textDecoration: 'none'}}>
                    <span className="logo">CatchUp</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <Search  className='searchIcon'/>
                    <input type="text" placeholder='Search Users' className='searchInput'/>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    {/* <span className="navbarLink">Profile</span> */}
                    {/* <div className="navbarIcons">
                        <Link to={"/profile/:username"} style={{textDecoration: 'none'}}><Person /></Link>
                    </div> */}
                </div>
                <div className="navbarLinks">
                    <button onClick={handleLogout} className="logoutBtn">Logout</button>
                </div>
                <Link to={`/users/${user.username}`}>
                    <div className="navbarImage">
                        <img src={user.profilePicture || "/assets/noPP.png"} alt="" />
                    </div>
                </Link>
            </div>            
        </div>
    );
};


export default Navbar;