import { useState, useEffect } from 'react';
import '../components/header.css';
import logoSecretaria from '../assets/images/logo_secretaria.png';

function Header({ estadoMenu, clickMenu }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [autorizado, setAutorizado] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };


    // Recupera estado do localStorage ao carregar a página
    useEffect(() => {
        const estadoAutorizado = localStorage.getItem('autorizado');
        if (estadoAutorizado === 'false') {
            setAutorizado(false);
        }
    }, []);

    // Função para validar o login
    function exit() {
        setAutorizado(true);
        localStorage.setItem('autorizado', 'false'); // Atualiza o localStorage diretamente
        window.location.reload()
    }

    return (
        <div className="header">
            {estadoMenu === 'close' && (
                <div onClick={clickMenu} className="icon-menu">
                    <i className="fa-solid fa-bars menu"></i>
                </div>
            )}
            {estadoMenu === 'open' && (
                <div onClick={clickMenu} className="icon-menu">
                    <i className="fa-solid fa-x menu"></i>
                </div>
            )}

            <div className="cabecalho-logo">
                <img src={logoSecretaria} alt="Logo Secretaria" />
                <h1>SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO</h1>
            </div>

            <div className="local-user" onClick={toggleUserMenu}>
                <div className="user" >
                    <i className="fa-solid fa-user user-i"></i>
                    <i className="fa-solid fa-chevron-down seta"></i>
                </div>

                {isUserMenuOpen && (
                    <div className="user-menu">
                        <p>Dados do perfil</p>
                        <p onClick={exit}>Sair<span><i class="fa-solid fa-right-from-bracket sair-icon"></i></span></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
