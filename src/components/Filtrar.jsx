import './filtrar.css'
import { useState } from 'react'

function Filtrar() {
    //Objeto que verifica se os menus estão abertos ou fechados
    const [stdCheckBox, setStdCheckBox] = useState({
        escolas: false,
    })

    //Objeto que quarda qual escola foi selecionada
    const [checkboxState, setCheckboxState] = useState({
        analia: { label: "Escola Anália", selected: false },
        outra1: { label: "Outra Escola 1", selected: false },
        outra2: { label: "Outra Escola 2", selected: false }
    });

    // para modificar apenas o campo selected do checkbox correspondente, mantendo os outros valores (label) intactos
    const toggleCheckbox = (key) => {
        setCheckboxState((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], selected: !prevState[key].selected }
        }))
        console.log(checkboxState)
    }

    // Alternar o estado do menu de dropdown
    const toggleDropdown = (menuKey) => {
        setStdCheckBox((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }))
        console.log(stdCheckBox);
    }


    return (
        <>
            <div className="filtro">
                <div className="filtros">
                    <div className="pesquisas">
                        <input type="text" className='input-pesquisa' placeholder='Pesquisa por nome e RA' />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="dropdown-checkbox">


                        <div
                            className="filter-close"
                            onClick={() => toggleDropdown("escolas")} // Alterna o menu ao clicar
                        >
                            <p>ESCOLAS</p>
                            <i
                                className={`fa-solid ${stdCheckBox.escolas ? "fa-chevron-up" : "fa-chevron-down"
                                    }`}
                            ></i>
                        </div>

                        {/* <div className='dropdown-open'>
                            <div className='filter-open'>
                                <p>ESCOLAS</p>
                                <i class="fa-solid fa-chevron-up"></i>
                            </div> */}


                        {/* Itera sobre os checkboxes dinamicamente */}

                        {stdCheckBox.escolas && (

                            Object.entries(checkboxState).map(([key, value], index) => (
                                <div
                                    key={index}
                                    className="item-checkbox"
                                    onClick={() => toggleCheckbox(key)}> {/* Alterna ao clicar*/}

                                    <div className="box-checkbox">
                                        {value.selected && <i className="fa-solid fa-check"></i>}
                                    </div>
                                    <p>{value.label}</p>
                                </div>
                            ))
                        )}


                        {/* </div> */}
                    </div>

                </div>

                <div className="mostrar">
                    <div className="mostrar-filtros">
                        <div className='filtros-selecionados'><p className='filtros-selecionados-p'>FILTROS SELECIONADOS:</p></div>

                        <p className='itens-filtro'>ESCOLA:</p>

                        <div className="exibir-filtro">
                            {Object.entries(checkboxState)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>

                        <p className='itens-filtro'>SÉRIE:</p>
                        <div className="exibir-filtro"></div>
                        <p className='itens-filtro'>TURMA:</p>
                        <div className="exibir-filtro"></div>
                        <p className='itens-filtro'>DIAGNÓSTICOS INICIAL:</p>
                        <div className="exibir-filtro"></div>
                        <p className='itens-filtro'>DIAGNÓSTICOS MEDIAL:</p>
                        <div className="exibir-filtro"></div>
                        <p className='itens-filtro'>DIAGNÓSTICOS FINAL:</p>
                        <div className="exibir-filtro"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filtrar