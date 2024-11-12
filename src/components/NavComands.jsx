import '../components/navComands.css'


function NavComands({estadoMenuLateral}) {    

    return (
        <>

            {estadoMenuLateral === 'close' &&(
                <nav className="menu-lateral">
                    <div className="container-icons">
                        <i className="fa-solid fa-house house"></i>
                        <div className="separador-dois"></div>
                        <i className="fa-solid fa-magnifying-glass lupa"></i>
                        <div className="separador-dois"></div>
                        <div className="escrita-filter">
                            <i className="fa-solid fa-sliders filtro_btn"></i>
                        </div>
                        <div className="confing-buttons">
                            <div className="duvidas">
                                <p className="interrogacao">?</p>
                            </div>
                            <i className="fa-solid fa-gear"></i>
                        </div>
                    </div>
                </nav>
            )}

            {estadoMenuLateral === 'open' && (
                <nav className="menu-lateral-open">
                    <div className="container-icons">
                        <div className="escrita-open-house">
                            <i className="fa-solid fa-house house"></i>
                            <p className="escrita-open">Início</p>
                        </div>
                        <div className="separador-tres"></div>
                        <div className="escrita-open-lupa">
                            <i className="fa-solid fa-magnifying-glass lupa"></i>
                            <p className="escrita-open">Pesquisar</p>
                        </div>
                        <div className="separador-tres"></div>
                        <div className="escrita-open-filter">
                            <i className="fa-solid fa-sliders filtro_btn"></i>
                            <p className="escrita-open">Filtrar</p>
                        </div>
                        <div className="confing-buttons">
                            <div className="div-duvidas">
                                <div className="duvidas">
                                    <p className="interrogacao">?</p>
                                </div>
                                <p className="guia">Guia</p>
                            </div>
                            <div className="escrita-open-config">
                                <i className="fa-solid fa-gear"></i>
                                <p className="escrita-open">Filtrar</p>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}

export default NavComands
