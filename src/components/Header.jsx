import '../components/header.css'
import logoSecretaria from '../assets/images/logo_secretaria.png'

function Header({estadoMenu, clickMenu}){

    return(
        <>
            <div className="header">

                {estadoMenu == 'close' &&(
                    <div onClick={clickMenu} className="icon-menu">
                        <i className="fa-solid fa-bars menu"></i>
                    </div>
                )}
                {estadoMenu == 'open' &&(
                    <div onClick={clickMenu} className="icon-menu">
                        <i className="fa-solid fa-x menu"></i>
                    </div>
                )}

                <div className="separador-um"></div>

                <div className="cabecalho-logo">
                    <img src={logoSecretaria} alt="" />
                    <h1>SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO</h1>
                </div>

            </div>
            
        </>
    )
}

export default Header