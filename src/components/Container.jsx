import '../components/container.css'
import NavComands from './NavComands'
import Header from './Header'
import HeroHome from './HeroHome'
import { useState } from 'react'

function Container(){
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


    return(
        <>
            <Header estadoMenu={estadoMenu} clickMenu={clickMenu}/>

            <div className='flex-conteudo'>
                <NavComands estadoMenuLateral={estadoMenu} />
                <HeroHome />
            </div>
            
        </>
    )
}

export default Container