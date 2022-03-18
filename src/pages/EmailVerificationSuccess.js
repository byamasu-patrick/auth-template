import { useNavigate } from "react-router-dom";


export const EmailVerificationSuccess = () => {
    const history = useNavigate();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can use all app's features
            </p>
            <button onClick={() => history('/')}>Go to home page</button>
        </div>
    );
}