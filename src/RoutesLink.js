import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import LoginPage from './pages/LoginPage';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import SignupPage from './pages/SignupPage';
import { UserInfoPage } from './pages/UserInfoPage';

export const RoutesLink = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<PrivateRoute/>} >
                    <Route path='/' exact element={<UserInfoPage />} />
                </Route>
                <Route path="/login" exact element={<LoginPage /> }/>
                <Route path="/please-verify" exact element={<PleaseVerifyEmailPage /> }/>                
                <Route path="/verify-email/:verificationString" exact element={<EmailVerificationLandingPage /> }/>
                <Route path="/signup-page" exact element={<SignupPage /> }/>
            </Routes>
        </Router>
    );
}