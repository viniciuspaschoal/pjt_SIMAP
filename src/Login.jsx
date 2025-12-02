import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_secretaria from './assets/images/logo_secretaria.png';
import img_google from './assets/images/G-google.png';
import img_secretaria_fachada from './assets/images/fachada-secretaria.png';
import './login.css';

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./services/firebaseConfig";

export default function Login() {

    const navigate = useNavigate();

    // Se já estiver logado, redireciona para o app
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) navigate('/home');
    }, [navigate]);


    async function fazerLoginGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            // Token REAL do Firebase
            const idToken = await result.user.getIdToken();

            // Enviar o token do Google para o backend
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: idToken })
            });

            if (!response.ok) {
                throw new Error("Erro ao autenticar no backend");
            }

            // Token interno do sistema (JWT criado pelo backend)
            const jwtSimap = await response.text();

            // Salvar no navegador: dados + token interno
            const userData = {
                nome: result.user.displayName,
                email: result.user.email,
                foto: result.user.photoURL,
                googleToken: idToken,
                simapToken: jwtSimap
            };

            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/home");

        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
        }
    }



    return (
        <>
            <div
                className="background-inicio"
                style={{
                    backgroundImage: `url(${img_secretaria_fachada})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                }}
            >
                <div className="login">
                    <img className="logo-login" src={logo_secretaria} alt="Logo Secretaria" />
                    <h1>SECRETARIA MUNICIPAL DE EDUCAÇÃO DE</h1>
                    <h1>SANTA BÁRBARA D'OESTE</h1>
                    <h2>LOGIN</h2>
                    <p id="escrita-clara">Institucional com</p>

                    {/* 🔥 AGORA O BOTÃO REAL DO GOOGLE */}
                    <div className="login-google" onClick={fazerLoginGoogle}>
                        <img src={img_google} alt="Google Login" />
                        <p>Logar com Google</p>
                    </div>

                    <p>Encontrou algo de errado?</p>
                    <p>Entre em <span>contato conosco</span></p>
                </div>

                {/* Rodapé */}
                <div className="footer">
                    <p>&copy; 2024 Secretaria Municipal de Educação - Todos os direitos reservados - SIMAP.</p>
                </div>
            </div>
        </>
    );
}