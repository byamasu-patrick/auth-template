import { useState } from "react";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail'
import axios from "axios";



export const EmailVerificationCodePage = () => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    
    const [verificationString, setVerificationString] = useState('');
    const { email } = useQueryParams();
    const [, setToken] = useToken();

    if(isSuccess) return <EmailVerificationSuccess />
    if(isFailure) return <EmailVerificationFail />

    const onSubmitVerificationString = async () => {
        try {
            const response = await axios.put('/api/verify-email', {
                email, verificationString
            });

            const { token } = response.data;

            setToken(token);
            setIsSuccess(true);
            
        } catch (error) {            
            setIsFailure(true);
        }
    }

    return (
        <div className="content-container">
            <h1>Please Verify Your Email</h1>
            <p>
                You should have received a verification code at the email you provide
            </p>

            <input
                type="number"
                placeholder="e.g. 123456"
                value={verificationString}
                onChange={(e) => setVerificationString(e.target.value)}
            />
            <button
                onClick={onSubmitVerificationString}>Verify</button>
        </div>
    );
}