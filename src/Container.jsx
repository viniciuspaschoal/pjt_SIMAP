import '../src/container.css'
import NavComands from './components/NavComands'
import Header from './components/Header'
import HeroHome from './components/HeroHome'
import Filtrar from './components/Filtrar'
import { useState } from 'react'

function Container(){
    const [estadoMenu, setEstadoMenu] = useState('close')
    const [estadoHome, setEstadoHome] = useState('home')
    

    //função para abrir e fechar menu
    function clickMenu() {
        if (estadoMenu === 'close') {
            setEstadoMenu('open')
            console.log('open')
        } else {
            setEstadoMenu('close')
            console.log('close')
        }
    }

    //função gerar estados para itens da nav
    function clickHome(){
        if(estadoHome != 'home'){
            setEstadoHome('home')
            console.log(estadoHome)
        }
    }

    function clickBusca(){
        setEstadoHome('busca')
        console.log(estadoHome)
    }

    function clickFilter(){
        setEstadoHome('filtro')
        console.log(estadoHome)
    }

    function clickGuide(){
        setEstadoHome('guide')
        console.log(estadoHome)
    }

    function clickSettings(){
        setEstadoHome('settings')
        console.log(estadoHome)
    }

    //função vai gerar estados para itens Home
    function clickGeral(){
        if(estadoHome != 'geral'){
            setEstadoHome('geral')
            console.log(estadoHome)
        }
    }

    function clickPJ(){
        setEstadoHome('projeto')
        console.log(estadoHome)
    }

    function clickSearch(){
        setEstadoHome('busca')
        console.log(estadoHome)
    }

    function clickGauge(){
        setEstadoHome('relatorio')
        console.log(estadoHome)
    }


    return(
        <>
            <Header estadoMenu={estadoMenu} clickMenu={clickMenu}/>

            <div className='flex-conteudo'>
                <NavComands estadoMenuLateral={estadoMenu} clickHome={clickHome} clickBusca={clickBusca} clickFilter={clickFilter} clickGuide={clickGuide} clickSettings={clickSettings}/>
                
                <div className="conteudo-geral">
                    {estadoHome === 'home' &&(
                        <HeroHome estadoHome={estadoHome} clickGauge={clickGauge} clickGeral={clickGeral} clickPJ={clickPJ} clickSearch={clickSearch}/>
                    )}
                    {estadoHome === 'geral' &&(
                        <Geral />
                    )}
                    {estadoHome === 'projeto' &&(
                        <Geral />
                    )}
                    {estadoHome === 'busca' &&(
                        <Filtrar />
                    )}
                    {estadoHome === 'relatorio' &&(
                        <Geral />
                    )}
                    
                    
                </div>
                
            </div>
            
        </>
    )
}

export default Container