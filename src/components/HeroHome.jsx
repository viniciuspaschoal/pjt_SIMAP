import './heroHome.css'

function HeroHome({clickGeral, clickPJ, clickSearch, clickGauge, estadoHome}){    

    return(
        <>
            <div className='home'>

                
                    <div className="itens-home" onClick={clickGeral}>
                        <div className="div-icons">
                            <i className="fa-solid fa-list-check icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            GERAL
                        </h2>
                    </div>

                    <div className="itens-home" onClick={clickPJ}>
                        <div className="div-icons">
                            <i className="fa-solid fa-user icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            PROJETO DE RECOMPOSIÇÃO
                        </h2>
                    </div>
                
                    <div className="itens-home" onClick={clickSearch}>
                        <div className="div-icons">
                            <i className="fa-solid fa-magnifying-glass icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            BUSCA DETALHADA
                        </h2>
                    </div>

                    <div className="itens-home" onClick={clickGauge}>
                        <div className="div-icons">
                            <i className="fa-solid fa-chart-simple icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            GERAR RELATÓRIO
                        </h2>
                    </div>
                

            </div>
        </>
    )
}

export default HeroHome