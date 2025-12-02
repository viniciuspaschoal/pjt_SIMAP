import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const jwt = localStorage.getItem("jwt");

    return jwt ? children : <Navigate to="/login" replace />;
}
