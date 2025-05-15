import React from "react";
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
    isAllowed: boolean;
    redirectionPath?: string;
    children?: React.ReactNode;
}

const ProtectedRoute = ({ isAllowed, redirectionPath = '/login', children }: ProtectedRouteProps) => {
    if (!isAllowed) return <Navigate to={redirectionPath} replace />;
    return children ? children : <Outlet />;
}

export default ProtectedRoute