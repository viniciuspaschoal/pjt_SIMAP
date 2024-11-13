import './heroHome.css'

function HeroHome(){
    return(
        <>
            <div className='home'>

                
                    <div className="itens-home">
                        <div className="div-icons">
                            <i class="fa-solid fa-list-check icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            GERAL
                        </h2>
                    </div>

                    <div className="itens-home">
                        <div className="div-icons">
                            <i class="fa-solid fa-user icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            PROJETO DE RECOMPOSIÇÃO
                        </h2>
                    </div>
                

                

                
                    <div className="itens-home">
                        <div className="div-icons">
                            <i class="fa-solid fa-magnifying-glass icon-home"></i>
                        </div>
                        <h2 className="title-itens">
                            BUSCA DETALHADA
                        </h2>
                    </div>

                    <div className="itens-home">
                        <div className="div-icons">
                            <i class="fa-solid fa-chart-simple icon-home"></i>
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