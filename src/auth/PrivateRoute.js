import {  Navigate, Outlet } from "react-router-dom";
import useUser from '../auth/useUser';

export const PrivateRoute = props => {
    // Check if the user is logged in
    
    const auth = useUser();

    return !auth ? <Navigate to="/login" replace/> : <Outlet />;
};

//export default PrivateRoute;