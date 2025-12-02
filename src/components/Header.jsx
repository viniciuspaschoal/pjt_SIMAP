import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSecretaria from '../assets/images/logo_secretaria.png';

function Header({ estadoMenu, clickMenu }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  function exit() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  }

  // Carrega o usuário corretamente
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);
      setImgError(false);
    }
  }, []);

  return (
    <div className="flex items-center bg-[#004b24] w-full h-[10%]">

      {/* Ícones do menu */}
      {estadoMenu === 'close' && (
        <div onClick={clickMenu} className="flex justify-center items-center w-[2vw] m-[20px] ml-4">
          <i className="fa-solid fa-bars text-2xl text-white cursor-pointer"></i>
        </div>
      )}

      {estadoMenu === 'open' && (
        <div onClick={clickMenu} className="flex justify-center items-center w-[2vw] m-[20px] ml-[38px]">
          <i className="fa-solid fa-x text-xl text-white cursor-pointer"></i>
        </div>
      )}

      {/* Logo + título */}
      <div className="flex items-center ml-[10px]">
        <img src={logoSecretaria} alt="Logo Secretaria" className="w-[40px]" />
        <h1 className="text-[#e7c801] text-center font-['Arial'] text-[24px] font-bold leading-normal pl-[24px]">
          SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO
        </h1>
      </div>

      {/* Perfil do usuário */}
      <div className="relative ml-auto pr-4" onClick={toggleUserMenu}>
        <div className="flex items-center cursor-pointer">

          {/* FOTO DO USUÁRIO */}
          {user?.fotoUrl && !imgError ? (
            <img
              src={user.fotoUrl}
              alt="Foto do usuário"
              className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white mr-[10px]"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center border-2 border-white mr-[10px]">
              <i className="fa-solid fa-user text-[#004b24] text-xl"></i>
            </div>
          )}

          <i className="fa-solid fa-chevron-down text-xl text-white"></i>
        </div>

        {/* Dropdown do usuário */}
        {isUserMenuOpen && (
          <div className="mt-[0.5vh] absolute top-full right-0 bg-white shadow-md rounded-lg p-[8px] w-[140px] z-[100] border border-[#cecece]">

            <p className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md">
              Dados do perfil
            </p>

            <p
              onClick={exit}
              className="my-[8px] py-[4px] px-[8px] text-sm text-[#333] cursor-pointer hover:bg-[#f0f0f0] hover:rounded-md"
            >
              Sair
              <span>
                <i className="fa-solid fa-right-from-bracket text-base ml-[10px]"></i>
              </span>
            </p>

          </div>
        )}
      </div>

    </div>
  );
}

export default Header;
