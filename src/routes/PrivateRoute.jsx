import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}){
    //Verifica se autorizado === 'true' no localStorage
    const isAutenticated = localStorage.getItem('autorizado') === 'true'; 

    //Se sim, mostra o conteúdo (children).
    //Se não, redireciona para /login.
    return isAutenticated ? children : <Navigate to="login" replace/>;
}