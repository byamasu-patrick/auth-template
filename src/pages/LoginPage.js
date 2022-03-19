import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from '../util/useQueryParams';

const LoginPage = () => {
    // Define state value
    const [token, setToken] = useToken();
    const [googleOAuthUrl, setGoogleOAuthUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const { token: oauthToken } = useQueryParams();

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

    useEffect(() => {
        if(oauthToken){
            setToken(oauthToken);
            history('/');
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                // Get the oauth url from google api
                const response = await axios.get('/auth/google/url');

                const { url } = response.data;
                setGoogleOAuthUrl(url);

            } catch (error) {
                console.log(error);
            }           
        }
        loadOauthUrl();
    }, []);

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
                onClick={ onLoginClicked }>Log In</button>
            <button 
                onClick={() => history('/forgot-password')}>Forgot your password?</button>
            <button 
                onClick={() => history('/signup-page')} >Don't have an account? Sign Up</button>
            <button 
                disabled={!googleOAuthUrl}
                onClick={ () => { window.location.href = googleOAuthUrl }} >Login with Google</button>
        </div>
    )
};

export default LoginPage;