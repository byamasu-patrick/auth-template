import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useToken } from "../auth/useToken";

const LoginPage = () => {
    // Define state value
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useNavigate();

    const onLoginClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        console.log(response.data)
        const { token } = response.data;
        setToken(token);
        history('/');
    };

    return (
        <div className="content-container">
            <h1>Login</h1>
            {errorMessage && <div className="fail"> { errorMessage } </div>}
            <input 
                type="email"
                value={emailValue}
                onChange={event => setEmailValue(event.target.value) }
                placeholder="someone@gmail.com" />
            <input 
                value={passwordValue}
                onChange={event => setPasswordValue(event.target.value) }
                type='password' 
                placeholder="Passoword" />
            <hr/>
            <button 
                disabled={!emailValue || !passwordValue}
                onClick={onLoginClicked}>Log In</button>
            <button 
                onClick={() => history('/forgot-password')}>Forgot your password?</button>
            <button 
                onClick={() => history('/signup-page')} >Don't have an account? Sign Up</button>
        </div>
    )
};

export default LoginPage;