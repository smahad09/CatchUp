import {React, useContext, useRef} from 'react';
import './login.css'
import { LoginCall } from '../../apiCalls';
import { AuthContext } from '../../context/authContext';
import {CircularProgress} from '@mui/material';
import {Link} from 'react-router-dom';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleSubmit = (e)=> {
        e.preventDefault();
        LoginCall({email: email.current.value ,password: password.current.value}, dispatch)
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
                    {error? <div className='errorMessage'>{error.response.data}</div>: ""}
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" className="loginInput" ref={email} required />
                        <input placeholder="Password" type="password" className='loginInput' ref={password}  required/>
                        <button className='loginButton'>{isFetching? <CircularProgress color="inherit"/>:"Login"}</button>
                        <Link to={'/register'} style={{textDecoration: 'none'}} className="loginRegister">
                            <button className='loginRegister'>Create A New Account</button>
                        </Link>                        
                    </form>                    
                </div>
            </div>
        </div>
    );
}

export default Login;
