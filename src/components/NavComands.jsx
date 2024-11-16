import '../components/navComands.css'


function NavComands({estadoMenuLateral, clickHome, clickBusca, clickFilter, clickGuide, clickSettings}) {    

    return (
        <>

            {estadoMenuLateral === 'close' &&(
                <nav className="menu-lateral">
                    <div className="container-icons">
                        <i className="fa-solid fa-house house" onClick={clickHome}></i>
                        <div className="separador-dois"></div>
                        <i className="fa-solid fa-magnifying-glass lupa" onClick={clickBusca}></i>
                        <div className="separador-dois"></div>
                        <div className="escrita-filter" onClick={clickFilter}>
                            <i className="fa-solid fa-sliders filtro_btn"></i>
                        </div>
                        <div className="confing-buttons">
                            <div className="duvidas" onClick={clickGuide}>
                                <p className="interrogacao">?</p>
                            </div>
                            <i className="fa-solid fa-gear" onClick={clickSettings}></i>
                        </div>
                    </div>
                </nav>
            )}

            {estadoMenuLateral === 'open' && (
                <nav className="menu-lateral-open">
                    <div className="container-icons">
                        <div className="escrita-open-house" onClick={clickHome}>
                            <i className="fa-solid fa-house house"></i>
                            <p className="escrita-open">Início</p>
                        </div>
                        <div className="separador-tres"></div>
                        <div className="escrita-open-lupa" onClick={clickBusca}>
                            <i className="fa-solid fa-magnifying-glass lupa"></i>
                            <p className="escrita-open">Pesquisar</p>
                        </div>
                        <div className="separador-tres"></div>
                        <div className="escrita-open-filter" onClick={clickFilter}>
                            <i className="fa-solid fa-sliders filtro_btn"></i>
                            <p className="escrita-open">Filtrar</p>
                        </div>
                        <div className="confing-buttons">
                            <div className="div-duvidas" onClick={clickGuide}>
                                <div className="duvidas">
                                    <p className="interrogacao">?</p>
                                </div>
                                <p className="guia">Guia</p>
                            </div>
                            <div className="escrita-open-config" onClick={clickSettings}>
                                <i className="fa-solid fa-gear"></i>
                                <p className="escrita-open">Configurar</p>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}

export default NavComands
