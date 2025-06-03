import './filtrar.css'
import { useState, useEffect } from 'react'

function Filtrar({ onApplyFilters, onFilterChange }) {
    const [filtrosAlterados, setFiltrosAlterados] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (filtrosAlterados) {
                event.preventDefault();
                event.returnValue = ''; // necessário para Chrome mostrar o alerta
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [filtrosAlterados]);

    const [stdCheckBox, setStdCheckBox] = useState({
        stdMenu: false,
        escolas: false,
        serie: false,
        turma: false,
        priBim: false,
        segBim: false,
        terBim: false,
        quarBim: false,
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
            seg_ano: { label: "2º Ano", selected: false },
            ter_ano: { label: "3º Ano", selected: false },
            quar_ano: { label: "4º Ano", selected: false },
            quin_ano: { label: "5º Ano", selected: false },
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

    const [checkboxBimestres, setCheckboxBimestres] = useState(
        loadFromLocalStorage('checkboxBimestres', {
            priBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            segBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            terBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            quarBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } }
        })
    );

    const atualizarStorage = () => {
        localStorage.setItem('checkboxEscola', JSON.stringify(checkboxEscola));
        localStorage.setItem('checkboxSerie', JSON.stringify(checkboxSerie));
        localStorage.setItem('checkboxTurma', JSON.stringify(checkboxTurma));
        localStorage.setItem('checkboxBimestres', JSON.stringify(checkboxBimestres));
    };

    const toggleCheckbox = (filterKey, key) => {
        if (filterKey === "escolas") {
            setCheckboxEscola((prevState) => {
                setFiltrosAlterados(true);
                return {
                    ...prevState,
                    [key]: { ...prevState[key], selected: !prevState[key].selected },
                };
            });
        } else if (filterKey === "serie") {
            setCheckboxSerie((prevState) => {
                setFiltrosAlterados(true);
                return {
                    ...prevState,
                    [key]: { ...prevState[key], selected: !prevState[key].selected },
                };
            });
        } else if (filterKey === "turma") {
            setCheckboxTurma((prevState) => {
                setFiltrosAlterados(true);
                return {
                    ...prevState,
                    [key]: { ...prevState[key], selected: !prevState[key].selected },
                };
            });
        } else if (["priBim", "segBim", "terBim", "quarBim"].includes(filterKey)) {
            setCheckboxBimestres((prevState) => {
                setFiltrosAlterados(true);
                return {
                    ...prevState,
                    [filterKey]: {
                        ...prevState[filterKey],
                        [key]: { selected: !prevState[filterKey][key].selected },
                    },
                };
            });
        }
    };

    const isFilterSelected = (filterState) => {
        return Object.values(filterState).some((value) => value.selected);
    };

    const aplicarFiltros = () => {
        const filtrosSelecionados = {
            escolas: Object.entries(checkboxEscola)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            serie: Object.entries(checkboxSerie)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            turma: Object.entries(checkboxTurma)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            diagnostico_priBim: Object.entries(checkboxBimestres.priBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            diagnostico_segBim: Object.entries(checkboxBimestres.segBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            diagnostico_terBim: Object.entries(checkboxBimestres.terBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            diagnostico_quarBim: Object.entries(checkboxBimestres.quarBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),

            periodo_bimestral: [
                ...(stdCheckBox.priBim ? ["1º BIMESTRE"] : []),
                ...(stdCheckBox.segBim ? ["2º BIMESTRE"] : []),
                ...(stdCheckBox.terBim ? ["3º BIMESTRE"] : []),
                ...(stdCheckBox.quarBim ? ["4º BIMESTRE"] : [])
            ]
        };

        console.log("Filtros aplicados:", filtrosSelecionados);

        localStorage.setItem('filtrosSelecionados', JSON.stringify(filtrosSelecionados));
        setFiltrosAlterados(false);
        onApplyFilters(filtrosSelecionados);
    };

    const limparFiltros = () => {
        localStorage.removeItem('checkboxEscola');
        localStorage.removeItem('checkboxSerie');
        localStorage.removeItem('checkboxTurma');
        localStorage.removeItem('checkboxBimestres');
        localStorage.removeItem('filtrosSelecionados');

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
            seg_ano: { label: "2º Ano", selected: false },
            ter_ano: { label: "3º Ano", selected: false },
            quar_ano: { label: "4º Ano", selected: false },
            quin_ano: { label: "5º Ano", selected: false },
        });

        setCheckboxTurma({
            ano_A: { label: "A", selected: false },
            ano_B: { label: "B", selected: false },
            ano_C: { label: "C", selected: false },
            ano_D: { label: "D", selected: false },
            ano_E: { label: "E", selected: false },
        });

        setCheckboxBimestres({
            priBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            segBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            terBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            quarBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } }
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
            diagnostico_priBim: Object.entries(checkboxBimestres.priBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),
            diagnostico_segBim: Object.entries(checkboxBimestres.segBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),
            diagnostico_terBim: Object.entries(checkboxBimestres.terBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),
            diagnostico_quarBim: Object.entries(checkboxBimestres.quarBim)
                .filter(([_, value]) => value.selected)
                .map(([key]) => key),
        };

        const filtrosSalvos = JSON.parse(localStorage.getItem('filtrosSelecionados')) || {};
    }, [
        checkboxEscola,
        checkboxSerie,
        checkboxTurma,
        checkboxBimestres,
        onFilterChange,
    ]);

    // ALERTA AO SAIR DA PÁGINA SE FILTROS ALTERADOS
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (filtrosAlterados) {
                event.preventDefault();
                event.returnValue = ''; // necessário para alertar no Chrome
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [filtrosAlterados]);

    return (
        <>
            <div className="filtro">
                <div className="filtros">
                    <div className="pesquisas">
                        <input type="text" className='input-pesquisa' placeholder='Pesquisa por nome e RA' />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="scroll-filtros">

                        {/* ESCOLAS */}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("escolas")}
                            >
                                <p>ESCOLAS</p>
                                <i className={`fa-solid ${stdCheckBox.escolas ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.escolas && (
                                Object.entries(checkboxEscola).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox("escolas", key)}
                                    >
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* SÉRIE */}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("serie")}
                            >
                                <p>SÉRIE</p>
                                <i className={`fa-solid ${stdCheckBox.serie ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.serie && (
                                Object.entries(checkboxSerie).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox("serie", key)}
                                    >
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* TURMA */}
                        <div className="dropdown-checkbox">
                            <div
                                className="filter-close"
                                onClick={() => toggleDropdown("turma")}
                            >
                                <p>TURMA</p>
                                <i className={`fa-solid ${stdCheckBox.turma ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.turma && (
                                Object.entries(checkboxTurma).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="item-checkbox"
                                        onClick={() => toggleCheckbox("turma", key)}
                                    >
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 1º BIMESTRE */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("priBim")}>
                                <p>1º BIMESTRE</p>
                                <i className={`fa-solid ${stdCheckBox.priBim ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.priBim && (
                                Object.entries(checkboxBimestres.priBim).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("priBim", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{key.toUpperCase()}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 2º BIMESTRE */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("segBim")}>
                                <p>2º BIMESTRE</p>
                                <i className={`fa-solid ${stdCheckBox.segBim ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.segBim && (
                                Object.entries(checkboxBimestres.segBim).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("segBim", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{key.toUpperCase()}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 3º BIMESTRE */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("terBim")}>
                                <p>3º BIMESTRE</p>
                                <i className={`fa-solid ${stdCheckBox.terBim ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.terBim && (
                                Object.entries(checkboxBimestres.terBim).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("terBim", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{key.toUpperCase()}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 4º BIMESTRE */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("quarBim")}>
                                <p>4º BIMESTRE</p>
                                <i className={`fa-solid ${stdCheckBox.quarBim ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.quarBim && (
                                Object.entries(checkboxBimestres.quarBim).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("quarBim", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{key.toUpperCase()}</p>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>

                    <div className="botoes-filtros">
                        <div className="bot-aplicar" onClick={() => { aplicarFiltros(); atualizarStorage(); }}>
                            <p>APLICAR FILTROS</p>
                        </div>

                        <div className="bot-limpar" onClick={limparFiltros}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                {/* MOSTRAR FILTROS SELECIONADOS */}
                <div className="mostrar">
                    <div className="mostrar-filtros">
                        <div className='filtros-selecionados'>
                            <p className='filtros-selecionados-p'>FILTROS SELECIONADOS</p>
                        </div>

                        {/* ESCOLA */}
                        {isFilterSelected(checkboxEscola) && (
                            <>
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
                            </>
                        )}

                        {/* SÉRIE */}
                        {isFilterSelected(checkboxSerie) && (
                            <>
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
                            </>
                        )}

                        {/* TURMA */}
                        {isFilterSelected(checkboxTurma) && (
                            <>
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
                            </>
                        )}

                        {/* 1º BIMESTRE */}
                        {isFilterSelected(checkboxBimestres.priBim) && (
                            <>
                                <p className='itens-filtro'>1º BIMESTRE:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxBimestres.priBim)
                                        .filter(([_, value]) => value.selected)
                                        .map(([key]) => (
                                            <p key={key} className='filtro-selecionado'>
                                                {key.toUpperCase()}
                                            </p>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* 2º BIMESTRE */}
                        {isFilterSelected(checkboxBimestres.segBim) && (
                            <>
                                <p className='itens-filtro'>2º BIMESTRE:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxBimestres.segBim)
                                        .filter(([_, value]) => value.selected)
                                        .map(([key]) => (
                                            <p key={key} className='filtro-selecionado'>
                                                {key.toUpperCase()}
                                            </p>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* 3º BIMESTRE */}
                        {isFilterSelected(checkboxBimestres.terBim) && (
                            <>
                                <p className='itens-filtro'>3º BIMESTRE:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxBimestres.terBim)
                                        .filter(([_, value]) => value.selected)
                                        .map(([key]) => (
                                            <p key={key} className='filtro-selecionado'>
                                                {key.toUpperCase()}
                                            </p>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* 4º BIMESTRE */}
                        {isFilterSelected(checkboxBimestres.quarBim) && (
                            <>
                                <p className='itens-filtro'>4º BIMESTRE:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxBimestres.quarBim)
                                        .filter(([_, value]) => value.selected)
                                        .map(([key]) => (
                                            <p key={key} className='filtro-selecionado'>
                                                {key.toUpperCase()}
                                            </p>
                                        ))}
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Filtrar