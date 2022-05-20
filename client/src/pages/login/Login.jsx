import {React, useState} from 'react';
import './login.css'

const Login = () => {
    const [head, setHead] = useState(['hello']);

    function changeHeading () {
        const newHead = 'I clicked the fucking button';
        setHead(newHead);
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CatchUp</h3>
                    <span className="loginDesc">
                        Message Friends For Free
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="text" placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className='loginInput' />
                        <button className='loginButton' onClick={changeHeading}>Login</button>
                        <button className='loginForgot'>Forgot</button>
                        <button className='loginRegister'>Create A New Account</button>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Login;
