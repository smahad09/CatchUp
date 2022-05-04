import React, { Component } from 'react';
import {Search, Person} from '@mui/icons-material'
import './navbar.css'

class Navbar extends Component {
    render () {
        return (
            <div className='navbar'>
                <div className="navbarLeft">
                    <span className="logo">MRM Social</span>
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
                            <Person />
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