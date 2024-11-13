import '../components/container.css'
import NavComands from './NavComands'
import Header from './Header'
import HeroHome from './HeroHome'
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
        setEstadoHome('home')
        console.log(estadoHome)
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
        setEstadoHome('geral')
        console.log('geral')
    }

    function clickPJ(){
        setEstadoHome('projeto')
        console.log('projeto')
    }

    function clickSearch(){
        setEstadoHome('busca')
        console.log('busca')
    }

    function clickGauge(){
        setEstadoHome('relatorio')
        console.log('relatorio')
    }


    return(
        <>
            <Header estadoMenu={estadoMenu} clickMenu={clickMenu}/>

            <div className='flex-conteudo'>
                <NavComands estadoMenuLateral={estadoMenu} clickHome={clickHome} clickBusca={clickBusca} clickFilter={clickFilter} clickGuide={clickGuide} clickSettings={clickSettings}/>

                <HeroHome estadoHome={estadoHome} clickGauge={clickGauge} clickGeral={clickGeral} clickPJ={clickPJ} clickSearch={clickSearch}/>
            </div>
            
        </>
    )
}

export default Container