import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const user = localStorage.getItem("user");

    // Se existe usuário no localStorage → autenticado
    return user ? children : <Navigate to="/login" replace />;
}
