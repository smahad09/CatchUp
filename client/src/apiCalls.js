import axios from 'axios';

export const LoginCall = async (userCredentials,dispatch)=> {
    dispatch({type: "LOGIN_START"});
    try {
        const response = await axios.post(`http://localhost:3001/auth/login`, userCredentials)
        dispatch({type: "LOGIN_SUCCESS", payload: response.data});
    } catch(err) { dispatch({type: "LOGIN_FAILURE", payload: err})};
}