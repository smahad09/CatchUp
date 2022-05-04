import React from 'react';
import './login.css'

const Login = () => {
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MRM</h3>
                    <span className="loginDesc">
                        Message friends for free!
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="text" placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className='loginInput' />
                        <button className='loginButton'>Login</button>
                        <button className='loginForgot'>Forgot</button>
                        <button className='loginRegister'>Create A New Account</button>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Login;
