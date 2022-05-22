import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import {useNavigate} from 'react-router-dom'
import './register.css'

const Login = () => {
    const [error, setError] = useState();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const username = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault(); 
        if (rePassword.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('http://localhost:3001/auth/register', user);
                navigate('/login');
            } catch(err) { setError(err) }
        }
    }

    

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CatchUp</h3>
                    <span className="loginDesc">
                        Message friends for free!
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                    {error? <div className='errorMessage'>{error.response.data}</div>: ""}
                        <input type="email" placeholder="Email" required ref={email} className="loginInput" />
                        <input type="text" placeholder="Username" required ref={username} className="loginInput" /> 
                        <input placeholder="Password" type='password' minLength={6} required ref={password} className='loginInput' />
                        <input placeholder="Re-type Password" type='password' minLength={6} required ref={rePassword} className='loginInput' />
                        <button className='loginButton' type='submit'>Register</button>
                    </form>                    
                </div>
            </div>
        </div>
    );
}

export default Login;
