import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ isAllowed, redirectionPath = '/login', children }) => {
    if(!isAllowed) return <Navigate to={redirectionPath} replace />;
    return children ? children : <Outlet />;
}

export default ProtectedRoute