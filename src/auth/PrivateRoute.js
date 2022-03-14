import { Route, Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = props => {
    // Check if the user is logged in
    const auth = null;

    return !auth ? <Navigate to="/login" replace/> : <Route {...props} />;
};

//export default PrivateRoute;