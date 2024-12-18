import { useState, useEffect } from 'react';
import logo_secretaria from './assets/images/logo_secretaria.png';
import img_google from './assets/images/G-google.png';
import img_secretaria_fachada from './assets/images/fachada-secretaria.png';
import './login.css';
import Container from './Container';

function Login() {
    const [autorizado, setAutorizado] = useState(false);

    // Recupera estado do localStorage ao carregar a página
    useEffect(() => {
        const estadoAutorizado = localStorage.getItem('autorizado');
        if (estadoAutorizado === 'true') {
            setAutorizado(true);
        }
    }, []);

    // Função para validar o login
    function validar() {
        setAutorizado(true);
        localStorage.setItem('autorizado', 'true'); // Atualiza o localStorage diretamente
    }

    return (
        <>
            {autorizado ? (
                <Container />
            ) : (
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

                        <div className="login-google" onClick={validar}>
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
            )}
        </>
    );
}

export default Login;
