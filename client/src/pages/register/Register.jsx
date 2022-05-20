import React from 'react';
import './register.css'

const Login = () => {
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
                    <div className="loginBox">
                        <input type="text" placeholder="Email" className="loginInput" />
                        <input type="text" placeholder="Username" className="loginInput" /> 
                        <input placeholder="Password" className='loginInput' />
                        <input placeholder="Re-type Password" className='loginInput' />
                        <button className='loginButton'>Register</button>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Login;
