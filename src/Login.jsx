import { useEffect } from 'react';
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
        const jwt = localStorage.getItem("jwt");
        if (jwt) navigate('/home');
    }, [navigate]);


    async function fazerLoginGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const idToken = await result.user.getIdToken();

            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: idToken })
            });

            // Se a resposta deu erro
            if (!response.ok) {
                const msg = await response.text();

                if (msg.includes("institucionais")) {
                    alert("❌ Apenas e-mails institucionais podem acessar este sistema.");
                }
                else if (msg.includes("liberado")) {
                    alert("⚠️ Seu cadastro foi criado, porém ainda não foi liberado por um administrador.");
                }
                else {
                    alert("❌ Ocorreu um erro ao autenticar. Tente novamente.");
                }

                return;
            }

            // Agora sim: backend retorna JSON
            const data = await response.json();

            // Salva token + user no localStorage
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/home");

        } catch (err) {
            alert("❌ Erro ao conectar com o Google. Tente novamente.");
            console.error(err);
        }
    }

    return (
        <div
            className="background-inicio"
            style={{
                backgroundImage: `url(${img_secretaria_fachada})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className="login">
                <img className="logo-login" src={logo_secretaria} alt="Logo Secretaria" />
                <h1>SECRETARIA MUNICIPAL DE EDUCAÇÃO DE</h1>
                <h1>SANTA BÁRBARA D'OESTE</h1>
                <h2>LOGIN</h2>
                <p id="escrita-clara">Institucional com</p>

                <div className="login-google" onClick={fazerLoginGoogle}>
                    <img src={img_google} alt="Google Login" />
                    <p>Logar com Google</p>
                </div>

                <p>Encontrou algo de errado?</p>
                <p>Entre em <span>contato conosco</span></p>
            </div>

            <div className="footer">
                <p>&copy; 2024 Secretaria Municipal de Educação - Todos os direitos reservados - SIMAP.</p>
            </div>
        </div>
    );
}
