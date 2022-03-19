import React, { useState } from "react";
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    // Define state value
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useNavigate();

    const onSignupClicked = async () => {
        
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });

        const { token } = response.data;
        setToken(token);
        history(`/please-verify?email=${ encodeURIComponent(emailValue) }`);
    };

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
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
                <input 
                value={confirmPasswordValue}
                onChange={event => setConfirmPasswordValue(event.target.value) }
                type='password' 
                placeholder="Confirm Pasword" />
            <hr/>
            <button 
                disabled={
                    !emailValue || !passwordValue ||
                    passwordValue !== confirmPasswordValue
                }
                onClick={onSignupClicked}>Sign Up</button>
            <button 
                onClick={() => history('/login')} >Already have an account? Login</button>
        </div>
    )
};

export default SignupPage;