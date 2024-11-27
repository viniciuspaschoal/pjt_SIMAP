import './filtrar.css'
import { useState } from 'react'

function Filtrar() {
    //Objeto que verifica se os menus estão abertos ou fechados
    const [stdCheckBox, setStdCheckBox] = useState({
        stdMenu: false,
    })

    //Lista de objetos para cada tipo de chackbox
    const [checkboxEscola, setCheckboxEscola] = useState({
        analia: { label: "EMEFEI Anália", selected: false },
        outra1: { label: "Outra Escola 1", selected: false },
        outra2: { label: "Outra Escola 2", selected: false },
        outra3: { label: "Outra Escola 2", selected: false },
        outra4: { label: "Outra Escola 2", selected: false },
        outra5: { label: "Outra Escola 2", selected: false },
        outra6: { label: "Outra Escola 2", selected: false },
    });

    const [checkboxSerie, setCheckboxSerie] = useState({
        pri_ano: { label: "1º Ano", selected: false },
        sec_ano: { label: "2º Ano", selected: false },
        trc_ano: { label: "3º Ano", selected: false },
        qrt_ano: { label: "4º Ano", selected: false },
        qnt_ano: { label: "5º Ano", selected: false },
    })

    const [checkboxTurma, setCheckboxTurma] = useState({
        ano_A: { label: "A", selected: false },
        ano_B: { label: "B", selected: false },
        ano_C: { label: "C", selected: false },
        ano_D: { label: "D", selected: false },
        ano_E: { label: "E", selected: false },
    })

    const [checkboxInicial, setCheckboxInicial] = useState({
        inic_leitura: { label: "LEITURA", selected: false },
        inic_escrita: { label: "ESCRITA", selected: false },
        inic_matematica: { label: "MATEMÁTICA", selected: false },
    })

    const [checkboxMedial, setCheckboxMedial] = useState({
        inic_leitura: { label: "LEITURA", selected: false },
        inic_escrita: { label: "ESCRITA", selected: false },
        inic_matematica: { label: "MATEMÁTICA", selected: false },
    })

    const [checkboxFinal, setCheckboxFinal] = useState({
        inic_leitura: { label: "LEITURA", selected: false },
        inic_escrita: { label: "ESCRITA", selected: false },
        inic_matematica: { label: "MATEMÁTICA", selected: false },
    })



    // para modificar apenas o campo selected do checkbox correspondente, mantendo os outros valores (label) intactos
    const toggleCheckbox = (setState, key) => {
        setState((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], selected: !prevState[key].selected }
        }))
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

                    <div className="scroll-filtros">

                        {/*ESCOLAS*/}
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
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Itera sobre os checkboxes dinamicamente */}
                            {stdCheckBox.escolas && (
                                Object.entries(checkboxEscola).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxEscola, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/*SÉRIE*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("serie")} // Alterna o menu ao clicar
                            >
                                <p>SÉRIE</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.serie ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Itera sobre os checkboxes dinamicamente */}
                            {stdCheckBox.serie && (
                                Object.entries(checkboxSerie).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxSerie, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/*TURMA*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("turma")} // Alterna o menu ao clicar
                            >
                                <p>TURMA</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.turma ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Itera sobre os checkboxes dinamicamente */}
                            {stdCheckBox.turma && (
                                Object.entries(checkboxTurma).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxTurma, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/*DIAGNÓSTICO INICIAL*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("inicial")} // Alterna o menu ao clicar
                            >
                                <p>DIAGNÓSTICO INICIAL</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.inicial ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Altera os checkboxes dinamicamente */}
                            {stdCheckBox.inicial && (
                                Object.entries(checkboxInicial).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxInicial, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>


                        {/*DIAGNÓSTICO MEDIAL*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("medial")} // Alterna o menu ao clicar
                            >
                                <p>DIAGNÓSTICO MEDIAL</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.medial ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Altera os checkboxes dinamicamente */}
                            {stdCheckBox.medial && (
                                Object.entries(checkboxMedial).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxMedial, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/*DIAGNÓSTICO FINAL*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("final")} // Alterna o menu ao clicar
                            >
                                <p>DIAGNÓSTICO INICIAL</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.final ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                             cada ítem;
                             *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                             *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                             *Altera os checkboxes dinamicamente */}
                            {stdCheckBox.final && (
                                Object.entries(checkboxFinal).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxFinal, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>

                    <div className="bot-aplicar">
                        <p>APLICAR FILTROS</p>
                    </div>

                </div>






                <div className="mostrar">
                    <div className="mostrar-filtros">
                        <div className='filtros-selecionados'><p className='filtros-selecionados-p'>FILTROS SELECIONADOS</p></div>

                        <p className='itens-filtro'>ESCOLA:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxEscola)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>SÉRIE:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxSerie)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>TURMA:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxTurma)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>DIAGNÓSTICOS INICIAL:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxInicial)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>DIAGNÓSTICOS MEDIAL:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxMedial)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>DIAGNÓSTICOS FINAL:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxFinal)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filtrar