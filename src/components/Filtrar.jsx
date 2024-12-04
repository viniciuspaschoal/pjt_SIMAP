import './filtrar.css'
import { useState, useEffect } from 'react'

function Filtrar({ onApplyFilters, onFilterChange }) {
    //estado para rastrear se os filtros estão aplicados ou não
    const [filtrosAlterados, setFiltrosAlterados] = useState(false);

    //Objeto que verifica se os menus estão abertos ou fechados
    const [stdCheckBox, setStdCheckBox] = useState({
        stdMenu: false,
        escolas: false,
        serie: false,
        turma: false,
        inicial: false,
    })

    // Alternar o estado do menu de dropdown
    const toggleDropdown = (menuKey) => {
        setStdCheckBox((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }))
        console.log(stdCheckBox);
    }

    // Função para carregar do localStorage
    const loadFromLocalStorage = (key, defaultValue) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    };

    // Inicializa estados com valores carregados do localStorage
    const [checkboxEscola, setCheckboxEscola] = useState(
        loadFromLocalStorage('checkboxEscola', {
            analia: { label: "EMEFEI Anália", selected: false },
            outra1: { label: "Outra Escola 1", selected: false },
            outra2: { label: "Outra Escola 2", selected: false },
            outra3: { label: "Outra Escola 2", selected: false },
            outra4: { label: "Outra Escola 2", selected: false },
            outra5: { label: "Outra Escola 2", selected: false },
            outra6: { label: "Outra Escola 2", selected: false },
        })
    );

    const [checkboxSerie, setCheckboxSerie] = useState(
        loadFromLocalStorage('checkboxSerie', {
            pri_ano: { label: "1º Ano", selected: false },
            sec_ano: { label: "2º Ano", selected: false },
            trc_ano: { label: "3º Ano", selected: false },
            qrt_ano: { label: "4º Ano", selected: false },
            qnt_ano: { label: "5º Ano", selected: false },
        })
    );

    const [checkboxTurma, setCheckboxTurma] = useState(
        loadFromLocalStorage('checkboxTurma', {
            ano_A: { label: "A", selected: false },
            ano_B: { label: "B", selected: false },
            ano_C: { label: "C", selected: false },
            ano_D: { label: "D", selected: false },
            ano_E: { label: "E", selected: false },
        })
    );

    const [checkboxInicial, setCheckboxInicial] = useState(
        loadFromLocalStorage('checkboxInicial', {
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    );

    const [checkboxMedial, setCheckboxMedial] = useState(
        loadFromLocalStorage('checkboxMedial', {
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    );

    const [checkboxFinal, setCheckboxFinal] = useState(
        loadFromLocalStorage('checkboxFinal', {
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    );

    // Atualiza localStorage sempre que algum filtro muda
    function atualizarStorage(){
            localStorage.setItem('checkboxEscola', JSON.stringify(checkboxEscola));
            localStorage.setItem('checkboxSerie', JSON.stringify(checkboxSerie));
            localStorage.setItem('checkboxTurma', JSON.stringify(checkboxTurma));
            localStorage.setItem('checkboxInicial', JSON.stringify(checkboxInicial));
            localStorage.setItem('checkboxMedial', JSON.stringify(checkboxMedial));
            localStorage.setItem('checkboxFinal', JSON.stringify(checkboxFinal));
    }

    // Função para alternar o estado dos checkboxes
    const toggleCheckbox = (setState, key) => {
        setState((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], selected: !prevState[key].selected },
        }));
    };

    // Função para enviar os filtros selecionados
    const aplicarFiltros = () => {
        const filtrosSelecionados = {
            escolas: Object.entries(checkboxEscola)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            serie: Object.entries(checkboxSerie)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            turma: Object.entries(checkboxTurma)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_inicial: Object.entries(checkboxInicial)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_medial: Object.entries(checkboxMedial)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_final: Object.entries(checkboxFinal)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
        };
    
        localStorage.setItem('filtrosSelecionados', JSON.stringify(filtrosSelecionados));
        setFiltrosAlterados(false);
        onApplyFilters(filtrosSelecionados);
    };

    const limparFiltros = () => {
        // Remove os itens do localStorage
        localStorage.removeItem('checkboxEscola')
        localStorage.removeItem('checkboxSerie')
        localStorage.removeItem('checkboxTurma')
        localStorage.removeItem('checkboxInicial')
        localStorage.removeItem('checkboxMedial')
        localStorage.removeItem('checkboxFinal')
    
        // Reseta os estados para os valores padrão
        setCheckboxEscola({
            analia: { label: "EMEFEI Anália", selected: false },
            outra1: { label: "Outra Escola 1", selected: false },
            outra2: { label: "Outra Escola 2", selected: false },
            outra3: { label: "Outra Escola 2", selected: false },
            outra4: { label: "Outra Escola 2", selected: false },
            outra5: { label: "Outra Escola 2", selected: false },
            outra6: { label: "Outra Escola 2", selected: false },
        })
    
        setCheckboxSerie({
            pri_ano: { label: "1º Ano", selected: false },
            sec_ano: { label: "2º Ano", selected: false },
            trc_ano: { label: "3º Ano", selected: false },
            qrt_ano: { label: "4º Ano", selected: false },
            qnt_ano: { label: "5º Ano", selected: false },
        })
    
        setCheckboxTurma({
            ano_A: { label: "A", selected: false },
            ano_B: { label: "B", selected: false },
            ano_C: { label: "C", selected: false },
            ano_D: { label: "D", selected: false },
            ano_E: { label: "E", selected: false },
        })
    
        setCheckboxInicial({
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    
        setCheckboxMedial({
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    
        setCheckboxFinal({
            inic_leitura: { label: "LEITURA", selected: false },
            inic_escrita: { label: "ESCRITA", selected: false },
            inic_matematica: { label: "MATEMÁTICA", selected: false },
        })
    
        // Console log para debug
        console.log('Filtros e Local Storage limpos');
    }


    useEffect(() => {
        const filtrosAtuais = {
            escolas: Object.entries(checkboxEscola)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            serie: Object.entries(checkboxSerie)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            turma: Object.entries(checkboxTurma)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_inicial: Object.entries(checkboxInicial)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_medial: Object.entries(checkboxMedial)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            diagnostico_final: Object.entries(checkboxFinal)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
        };
    
        const filtrosSalvos = JSON.parse(localStorage.getItem('filtrosSelecionados')) || {};
        const houveAlteracao = JSON.stringify(filtrosAtuais) !== JSON.stringify(filtrosSalvos);
    
        setFiltrosAlterados(houveAlteracao);
    
        if (onFilterChange) {
            onFilterChange(!houveAlteracao);
        }
    }, [
        checkboxEscola,
        checkboxSerie,
        checkboxTurma,
        checkboxInicial,
        checkboxMedial,
        checkboxFinal,
        onFilterChange,
    ]);


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
                                <p>DIAGNÓSTICO FINAL</p>
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

                    <div className="botoes-filtros">
                        <div className="bot-aplicar" onClick={() => {aplicarFiltros(), atualizarStorage()}}>
                            <p>APLICAR FILTROS</p>
                        </div>

                        <div className="bot-limpar" onClick={limparFiltros}>
                            <i class="fa-solid fa-trash"></i>
                        </div>
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