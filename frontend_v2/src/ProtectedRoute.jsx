import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated , redirect}) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
