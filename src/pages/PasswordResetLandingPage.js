import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PasswordResetFail } from "./PasswordResetFail";
import { PasswordResetSuccess } from "./PasswordResetSuccess";

export const PasswordResetLanding = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const { passwordResetCode } = useParams();

    if(isFailure) return <PasswordResetFail />
    if(isSuccess) return <PasswordResetSuccess />

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: passwordValue });
            setIsSuccess(true);

        } catch (error) {

            setIsFailure(true);
        }
    }

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter new password</p>
            <input 
                type='password'
                value={passwordValue}
                onChange={event => setPasswordValue(event.target.value)}
                placeholder="Password" />
            <input 
                type='password'
                value={confirmPasswordValue}
                onChange={event => setConfirmPasswordValue(event.target.value)}
                placeholder="Confirm password" />

            <button
                disabled={ !passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue }
                onClick={ onResetClicked }>Reset Password</button>
        </div>
    );
}