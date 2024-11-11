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

            {estadoMenu === 'close' && (
                <nav class="menu-lateral">

                    <div class="container-icons">

                        <i class="fa-solid fa-house house"></i>
                        <div class="separador-dois"></div>

                        <i class="fa-solid fa-magnifying-glass lupa"></i>
                        <div class="separador-dois"></div>

                        <div class="escrita-filter">
                            <i class="fa-solid fa-sliders filtro_btn"></i>
                        </div>

                        <div class="confing-buttons">
                            <div class="duvidas">
                                <p class="interrogacao">?</p>
                            </div>
                            <i class="fa-solid fa-gear"></i>
                        </div>

                    </div>
                </nav>

            )}

            {estadoMenu === 'open' && (

                <nav class="menu-lateral-open">

                    <div class="container-icons">
                        <div class="escrita-open-house">
                            <i class="fa-solid fa-house house"></i>
                            <p class="escrita-open">Início</p>
                        </div>

                        <div class="separador-tres"></div>

                        <div class="escrita-open-lupa">
                            <i class="fa-solid fa-magnifying-glass lupa"></i>
                            <p class="escrita-open">Pesquisar</p>
                        </div>

                        <div class="separador-tres"></div>

                        <div class="escrita-open-filter">
                            <i class="fa-solid fa-sliders filtro_btn"></i>
                            <p class="escrita-open">Filtrar</p>
                        </div>

                        <div class="confing-buttons">
                            <div class="div-duvidas">
                                <div class="duvidas">
                                    <p class="interrogacao">?</p>
                                </div>
                                <p class="guia">Guia</p>
                            </div>

                            <div class="escrita-open-config">
                                <i class="fa-solid fa-gear"></i>
                                <p class="escrita-open">Filtrar</p>
                            </div>
                        </div>

                    </div>

                </nav>

            )}





        </>
    )
}

export default NavComands