import '../components/header.css'
import logoSecretaria from '../assets/images/logo_secretaria.png'
import { useState } from 'react'

function Header({estadoMenu, clickMenu}){

    // const [estadoMenu, setEstadoMenu] = useState('close')

    // function clickMenu() {
    //     if (estadoMenu === 'close') {
    //         setEstadoMenu('open')
    //         setEstadoMenuLateral('open')
    //         console.log('open')
    //     } else {
    //         setEstadoMenu('close')
    //         setEstadoMenuLateral('close')
    //         console.log('close')
    //     }
    // }

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