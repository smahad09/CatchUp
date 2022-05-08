import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Search, Person} from '@mui/icons-material'
import './navbar.css'

class Navbar extends Component {
    render () {
        return (
            <div className='navbar'>
                <div className="navbarLeft">
                    <span className="logo">CatchUp</span>
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
                        <div className="navbarIcons">
                            <Link to={"/profile"}><Person /></Link>
                        </div>
                    </div>
                    <div className="navbarImage">
                        <img src="/assets/chatApp.jpg" alt="" />
                    </div>
                </div>
                
            </div>
        );
    };
};


export default Navbar;