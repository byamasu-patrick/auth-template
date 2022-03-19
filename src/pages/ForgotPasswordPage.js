import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState("");

    const history = useNavigate();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);

            setSuccess(true);
            setTimeout(() => {
                history(`/reset-password?email=${encodeURIComponent(emailValue)}`);
            }, 3000);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link </p>
            { errorMessage && <div className="fail">{errorMessage}</div>}

            <input 
                value={emailValue}
                onChange={event => setEmailValue(event.target.value)}
                placeholder="someone@gmail.com" />

            <button 
                disabled={ !emailValue }
                onClick={onSubmitClicked}
                >Send Reset Link</button>
        </div>
    )


}