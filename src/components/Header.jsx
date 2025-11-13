import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSecretaria from '../assets/images/logo_secretaria.png'; // Importando a imagem do logo

// Função que representa o cabeçalho (Header)
function Header({ estadoMenu, clickMenu }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);  // Hook para controlar o estado do menu de usuário (aberto ou fechado)
  const navigate = useNavigate();  // Hook para navegação

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);  // Alterna o estado do menu de usuário entre aberto e fechado
  };

  function exit() {
    // Função de logout que remove a autorização e redireciona para o login
    localStorage.setItem('autorizado', 'false');  // Remove o estado de autorização
    navigate('/login');  // Redireciona para a página de login
  }

  return (
    <div className="flex items-center bg-[#004b24] w-full h-[10%]">
      
      {/* Menu - Ícone de menu (três barras) */}
      {estadoMenu === 'close' && (  // Verifica se o menu está fechado
        <div
          onClick={clickMenu}  // Chama a função clickMenu quando o ícone for clicado
          className="flex justify-center items-center w-[2vw] m-[20px] ml-4"
        >
          <i className="fa-solid fa-bars text-2xl text-white cursor-pointer"></i>  {/* Ícone de menu */}
        </div>
      )}

      {/* Menu - Ícone de fechar (X) */}
      {estadoMenu === 'open' && (  // Verifica se o menu está aberto
        <div
          onClick={clickMenu}  // Chama a função clickMenu para fechar o menu
          className="flex justify-center items-center w-[2vw] m-[20px] ml-[38px]"
        >
          <i className="fa-solid fa-x text-xl text-white cursor-pointer"></i>  {/* Ícone de fechar */}
        </div>
      )}

      {/* Logo e Título */}
      <div className="flex items-center ml-[10px]">  {/* Ajusta a margem para aproximar o logo do menu */}
        <img src={logoSecretaria} alt="Logo Secretaria" className="w-[40px]" />  {/* Logo da Prefeitura */}
        <h1 className="text-[#e7c801] text-center font-['Arial'] text-[24px] font-bold leading-normal pl-[24px]">
          SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO  {/* Título do sistema */}
        </h1>
      </div>

      {/* Menu de Usuário - Alinhado à direita */}
      <div className="relative ml-auto pr-4" onClick={toggleUserMenu}>  {/* 'ml-auto' coloca o menu de usuário à direita */}
        <div className="flex items-center cursor-pointer text-black text-[1.4rem]">
          <i className="fa-solid fa-user bg-white rounded-full p-3 mr-[0.5vw] ml-[5px]"></i>  {/* Ícone de usuário */}
          <i className="fa-solid fa-chevron-down text-xl text-white ml-[5px]"></i>  {/* Setinha do menu (indica que há um menu suspenso) */}
        </div>

        {/* Menu suspenso de opções de usuário */}
        {isUserMenuOpen && (  // Verifica se o menu de usuário está aberto
          <div className="mt-[0.5vh] mr-3 absolute top-full right-0 bg-white shadow-md rounded-lg p-[8px] w-[130px] z-[100] border border-[#cecece]">
            <p className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md">
              Dados do perfil  {/* Opção para acessar os dados do perfil */}
            </p>
            <p
              onClick={exit}  // Chama a função 'exit' ao clicar em "Sair"
              className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md"
            >
              Sair  {/* Opção para sair */}
              <span>
                <i className="fa-solid fa-right-from-bracket text-base ml-[1vw]"></i>  {/* Ícone de logout */}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
