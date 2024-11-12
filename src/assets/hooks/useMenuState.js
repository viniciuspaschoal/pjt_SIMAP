import { useState } from 'react'

export function useMenuState() {
    const [estadoMenu, setEstadoMenu] = useState('close')
    const [estadoMenuLateral, setEstadoMenuLateral] = useState('close')

    function clickMenu() {
        if (estadoMenu === 'close') {
            setEstadoMenu('open')
            setEstadoMenuLateral('open')
            console.log('open')
        } else {
            setEstadoMenu('close')
            setEstadoMenuLateral('close')
            console.log('close')
        }
    }

    return { estadoMenu, clickMenu, estadoMenuLateral }  // Exporta as variáveis
}

export default useMenuState