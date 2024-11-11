import './navegationComands.css'
import logoSecretaria from '../assets/images/logo_secretaria.png'
import { useState } from 'react'


function NavComands() {
    const [estadoMenu, setEstadoMenu] = useState('close')

    function clickMenu() {
        if (estadoMenu === 'close') {
            setEstadoMenu('open')
            console.log('open')
        } else {
            setEstadoMenu('close')
            console.log('close')
        }
    }


    return (
        <>

            <div className="header">
                <div onClick={clickMenu} className="icon-menu">
                    <i className="fa-solid fa-bars menu"></i>
                </div>

                <div className="separador-um"></div>

                <div className="cabecalho-logo">
                    <img src={logoSecretaria} alt="" />
                    <h1>SISTEMA DE MONITORAMENTO E ACOMPANHAMENTO PEDAGÓGICO</h1>
                </div>

            </div>

            





        </>
    )
}

export default NavComands