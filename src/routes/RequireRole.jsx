import { Navigate } from "react-router-dom";

export default function RequireRole({ roles, children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <Navigate to="/login" replace />;

    if (!roles.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
}
