import './filtrar.css'
import { useState, useEffect } from 'react'

function Filtrar({ onApplyFilters, onFilterChange }) {
    const [filtrosAlterados, setFiltrosAlterados] = useState(false);

    const [stdCheckBox, setStdCheckBox] = useState({
        stdMenu: false,
        escolas: false,
        serie: false,
        turma: false,
        periodo: false,
        alfabetizacao: false,
    });

    const toggleDropdown = (menuKey) => {
        setStdCheckBox((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }));
    };

    const loadFromLocalStorage = (key, defaultValue) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    };

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

    const [checkboxPeriodoB, setCheckboxPeriodoB] = useState(
        loadFromLocalStorage('checkboxPeriodoB', {
            inic_priBim: { label: "1º BIMESTRE", selected: false },
            inic_segBim: { label: "2º BIMESTRE", selected: false },
            inic_terBim: { label: "3º BIMESTRE", selected: false },
            inic_quarBim: { label: "4º BIMESTRE", selected: false },
        })
    );

    const [checkboxAlfabetizacao, setCheckboxAlfabetizacao] = useState(
        loadFromLocalStorage('checkboxAlfabetizacao', {
            ps: { label: "PS", selected: false },
            ssvs: { label: "SSVS", selected: false },
            scvs: { label: "SCVS", selected: false },
            sa: { label: "SA", selected: false },
            alf: { label: "ALF", selected: false },
        })
    );

    function atualizarStorage() {
        localStorage.setItem('checkboxEscola', JSON.stringify(checkboxEscola));
        localStorage.setItem('checkboxSerie', JSON.stringify(checkboxSerie));
        localStorage.setItem('checkboxTurma', JSON.stringify(checkboxTurma));
        localStorage.setItem('checkboxPeriodoB', JSON.stringify(checkboxPeriodoB));
        localStorage.setItem('checkboxAlfabetizacao', JSON.stringify(checkboxAlfabetizacao));
    }

    const toggleCheckbox = (setState, key) => {
        setState((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], selected: !prevState[key].selected },
        }));
    };

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
            periodo_bimestral: Object.entries(checkboxPeriodoB)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            alfabetizacao: Object.entries(checkboxAlfabetizacao)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
        };

        console.log("Filtros aplicados ->", filtrosSelecionados);

        localStorage.setItem('filtrosSelecionados', JSON.stringify(filtrosSelecionados));
        setFiltrosAlterados(false);
        onApplyFilters(filtrosSelecionados);
    };

    const limparFiltros = () => {
        localStorage.removeItem('checkboxEscola');
        localStorage.removeItem('checkboxSerie');
        localStorage.removeItem('checkboxTurma');
        localStorage.removeItem('checkboxPeriodoB');
        localStorage.removeItem('checkboxAlfabetizacao');

        setCheckboxEscola({
            analia: { label: "EMEFEI Anália", selected: false },
            outra1: { label: "Outra Escola 1", selected: false },
            outra2: { label: "Outra Escola 2", selected: false },
            outra3: { label: "Outra Escola 2", selected: false },
            outra4: { label: "Outra Escola 2", selected: false },
            outra5: { label: "Outra Escola 2", selected: false },
            outra6: { label: "Outra Escola 2", selected: false },
        });

        setCheckboxSerie({
            pri_ano: { label: "1º Ano", selected: false },
            sec_ano: { label: "2º Ano", selected: false },
            trc_ano: { label: "3º Ano", selected: false },
            qrt_ano: { label: "4º Ano", selected: false },
            qnt_ano: { label: "5º Ano", selected: false },
        });

        setCheckboxTurma({
            ano_A: { label: "A", selected: false },
            ano_B: { label: "B", selected: false },
            ano_C: { label: "C", selected: false },
            ano_D: { label: "D", selected: false },
            ano_E: { label: "E", selected: false },
        });

        setCheckboxPeriodoB({
            inic_priBim: { label: "1º BIMESTRE", selected: false },
            inic_segBim: { label: "2º BIMESTRE", selected: false },
            inic_terBim: { label: "3º BIMESTRE", selected: false },
            inic_quarBim: { label: "4º BIMESTRE", selected: false },
        });

        setCheckboxAlfabetizacao({
            ps: { label: "PS", selected: false },
            ssvs: { label: "SSVS", selected: false },
            scvs: { label: "SCVS", selected: false },
            sa: { label: "SA", selected: false },
            alf: { label: "ALF", selected: false },
        });

        console.log('Filtros e Local Storage limpos');
    };

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
            periodo_bimestral: Object.entries(checkboxPeriodoB)
                .filter(([_, value]) => value.selected)
                .map(([_, value]) => value.label),
            alfabetizacao: Object.entries(checkboxAlfabetizacao)
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
        checkboxPeriodoB,
        checkboxAlfabetizacao,
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

                        {/*PERÍODO BIMESTRAL*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("periodo")} // Alterna o menu ao clicar
                            >
                                <p>PERÍODO BIMESTRAL</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.periodo ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                                cada ítem;
                                *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                                *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                                *Altera os checkboxes dinamicamente */}

                            {stdCheckBox.periodo && (
                                Object.entries(checkboxPeriodoB).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxPeriodoB, key)}> {/* Alterna ao clicar*/}

                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>


                        {/*NIVEL DE ALFABETIZAÇÃO*/}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("alfabetizacao")} // Alterna o menu ao clicar
                            >
                                <p>ALFABETIZAÇÃO</p>
                                <i
                                    className={`fa-solid ${stdCheckBox.alfabetizacao ? "fa-chevron-up" : "fa-chevron-down"
                                        }`}
                                ></i>
                            </div>
                            {/* *Recebe o objeto setado com as informações de confirmação de estado e nome de
                                cada ítem;
                                *Ao ser clicado, a função identifica se o ítem estava aberto ou fechado fazendo com que a mesma altere o estado da variável do objeto(true ou false); 
                                *A quantidade de ítens no objeto vão determinar o tamanho dessta secção com os filtros;
                                *Altera os checkboxes dinamicamente */}
                            {stdCheckBox.alfabetizacao  && (
                                Object.entries(checkboxAlfabetizacao).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox(setCheckboxAlfabetizacao, key)}> {/* Alterna ao clicar*/}

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

                {/*MOSTRAR FILTROS SELECIONADOS*/}
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


                        <p className='itens-filtro'>PERÍODO BIMESTRAL:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxPeriodoB)
                                .filter(([_, value]) => value.selected)
                                .map(([key, value]) => (
                                    <p key={key} className='filtro-selecionado'>
                                        {value.label}
                                    </p>
                                ))}
                        </div>


                        <p className='itens-filtro'>ALFABETIZÇÃO:</p>
                        <div className="exibir-filtro">
                            {Object.entries(checkboxAlfabetizacao)
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