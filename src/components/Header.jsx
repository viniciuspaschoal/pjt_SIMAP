import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSecretaria from '../assets/images/logo_secretaria.png';

function Header({ estadoMenu, clickMenu }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(false); // <--- NOVO: Estado para controlar erro na imagem
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  function exit() {
    localStorage.setItem('autorizado', 'false');
    // Limpar o user ao sair é uma boa prática
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUser(data);
      setImgError(false); // Reseta o erro ao carregar usuário
    }
  }, []);

  return (
    <div className="flex items-center bg-[#004b24] w-full h-[10%]">

      {/* Menu abertura */}
      {estadoMenu === 'close' && (
        <div onClick={clickMenu} className="flex justify-center items-center w-[2vw] m-[20px] ml-4">
          <i className="fa-solid fa-bars text-2xl text-white cursor-pointer"></i>
        </div>
      )}

      {/* Menu fechar */}
      {estadoMenu === 'open' && (
        <div onClick={clickMenu} className="flex justify-center items-center w-[2vw] m-[20px] ml-[38px]">
          <i className="fa-solid fa-x text-xl text-white cursor-pointer"></i>
        </div>
      )}

      {/* Logo + Título */}
      <div className="flex items-center ml-[10px]">
        <img src={logoSecretaria} alt="Logo Secretaria" className="w-[40px]" />
        <h1 className="text-[#e7c801] text-center font-['Arial'] text-[24px] font-bold leading-normal pl-[24px]">
          SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO
        </h1>
      </div>

      {/* Perfil do Usuário */}
      <div className="relative ml-auto pr-4" onClick={toggleUserMenu}>
        <div className="flex items-center cursor-pointer text-black text-[1.4rem]">

          {/* LÓGICA DA FOTO CORRIGIDA */}
          {/* Se tem foto E não deu erro ao carregar, mostra a imagem */}
          {user?.foto && !imgError ? (
            <img
              src={user.foto}
              alt="Foto do usuário"
              className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white mr-[0.5vw] ml-[5px]"
              // 1. O pulo do gato: Evita bloqueio do Google
              referrerPolicy="no-referrer"
              // 2. Se a imagem quebrar, ativa o modo ícone
              onError={() => setImgError(true)}
            />
          ) : (
            // Fallback: Ícone padrão se não tiver foto OU se a foto quebrar
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center mr-[0.5vw] ml-[5px] border-2 border-transparent">
              <i className="fa-solid fa-user text-[#004b24] text-xl"></i>
            </div>
          )}

          <i className="fa-solid fa-chevron-down text-xl text-white ml-[5px]"></i>
        </div>

        {/* Menu dropdown */}
        {isUserMenuOpen && (
          <div className="mt-[0.5vh] mr-3 absolute top-full right-0 bg-white shadow-md rounded-lg p-[8px] w-[130px] z-[100] border border-[#cecece]">
            <p className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md">
              Dados do perfil
            </p>

            <p
              onClick={exit}
              className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md"
            >
              Sair
              <span>
                <i className="fa-solid fa-right-from-bracket text-base ml-[1vw]"></i>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;