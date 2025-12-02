import './filtrar.css';
import { useState, useEffect } from 'react';
import { buscarAlunos } from '../services/alunoService'; // Certifique-se de ter criado essa função no service

function Filtrar({ onApplyFilters, onFilterChange, onAlunoSelecionado }) {

    // ============================================
    // 1. ESTADOS DA NOVA PESQUISA (AUTOCOMPLETE)
    // ============================================
    const [termoBusca, setTermoBusca] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [mostrandoSugestoes, setMostrandoSugestoes] = useState(false);

    // ============================================
    // 2. ESTADOS DOS FILTROS (CÓDIGO ORIGINAL)
    // ============================================
    const [filtrosAlterados, setFiltrosAlterados] = useState(false);

    const [stdCheckBox, setStdCheckBox] = useState({
        stdMenu: false,
        anoLetivo: false,
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

    // ====== ANO LETIVO ======
    const [checkboxAnoLetivo, setCheckboxAnoLetivo] = useState(
        loadFromLocalStorage("checkboxAnoLetivo", {
            ano_2024: { label: "2024", value: "2024", selected: false },
            ano_2025: { label: "2025", value: "2025", selected: false }
        })
    );

    // ====== ESCOLAS ======
    const [checkboxEscola, setCheckboxEscola] = useState(
        loadFromLocalStorage('checkboxEscola', {
            analia: { label: "EMEFEI ANÁLIA", value: "EMEFEI ANÁLIA DE LUCCA FURLAN", selected: false },
            outra1: { label: "Outra Escola", value: "EMEFEI CENTRO", selected: false }
        })
    );

    // ====== SÉRIES ======
    const [checkboxSerie, setCheckboxSerie] = useState(
        loadFromLocalStorage('checkboxSerie', {
            pri_ano: { label: "1º Ano", value: "1", selected: false },
            seg_ano: { label: "2º Ano", value: "2", selected: false },
            ter_ano: { label: "3º Ano", value: "3", selected: false },
            quar_ano: { label: "4º Ano", value: "4", selected: false },
            quin_ano: { label: "5º Ano", value: "5", selected: false },
        })
    );

    // ====== TURMAS ======
    const [checkboxTurma, setCheckboxTurma] = useState(
        loadFromLocalStorage('checkboxTurma', {
            ano_A: { label: "A", selected: false },
            ano_B: { label: "B", selected: false },
            ano_C: { label: "C", selected: false },
            ano_D: { label: "D", selected: false },
            ano_E: { label: "E", selected: false },
        })
    );

    // ====== BIMESTRES ======
    const [checkboxBimestres, setCheckboxBimestres] = useState(
        loadFromLocalStorage('checkboxBimestres', {
            priBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            segBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            terBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } },
            quarBim: { ps: { selected: false }, ssvs: { selected: false }, scvs: { selected: false }, sa: { selected: false }, alf: { selected: false } }
        })
    );

    // Atualiza LOCALSTORAGE
    const atualizarStorage = () => {
        localStorage.setItem("checkboxAnoLetivo", JSON.stringify(checkboxAnoLetivo));
        localStorage.setItem("checkboxEscola", JSON.stringify(checkboxEscola));
        localStorage.setItem("checkboxSerie", JSON.stringify(checkboxSerie));
        localStorage.setItem("checkboxTurma", JSON.stringify(checkboxTurma));
        localStorage.setItem("checkboxBimestres", JSON.stringify(checkboxBimestres));
    };

    // ============================================
    // LÓGICA DE AUTOCOMPLETE (BUSCA)
    // ============================================

    // 1. Monitora o que o usuário digita
    const handleSearchInput = async (e) => {
        const texto = e.target.value;
        setTermoBusca(texto);

        // Só busca no backend se tiver mais de 2 letras
        if (texto.length > 2) {
            try {
                const response = await buscarAlunos(texto);
                setSugestoes(response.data); // Backend retorna lista de DTOs simplificados
                setMostrandoSugestoes(true);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
                setSugestoes([]);
            }
        } else {
            setSugestoes([]);
            setMostrandoSugestoes(false);
        }
    };

    // 2. Quando o usuário clica em um nome da lista
    const handleSelectSuggestion = (aluno) => {
        setTermoBusca(aluno.nomeAluno); // Preenche o input com o nome
        setMostrandoSugestoes(false);   // Esconde a lista

        // Chama a função passada pelo Container para navegar
        if (onAlunoSelecionado) {
            onAlunoSelecionado(aluno.ra);
        }
    };

    // 3. Fecha a lista se clicar fora do componente
    useEffect(() => {
        const handleClickOutside = () => setMostrandoSugestoes(false);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);


    // ============================================
    // LÓGICA DE CHECKBOXES (ORIGINAL)
    // ============================================
    const toggleCheckbox = (filterKey, key) => {

        setFiltrosAlterados(true);
        onFilterChange(false); // marca como "filtros modificados"

        if (filterKey === "anoLetivo") {
            setCheckboxAnoLetivo(prev => ({
                ...prev,
                [key]: { ...prev[key], selected: !prev[key].selected }
            }));
        }
        else if (filterKey === "escolas") {
            setCheckboxEscola(prev => ({
                ...prev,
                [key]: { ...prev[key], selected: !prev[key].selected }
            }));
        }
        else if (filterKey === "serie") {
            setCheckboxSerie(prev => ({
                ...prev,
                [key]: { ...prev[key], selected: !prev[key].selected }
            }));
        }
        else if (filterKey === "turma") {
            setCheckboxTurma(prev => ({
                ...prev,
                [key]: { ...prev[key], selected: !prev[key].selected }
            }));
        }
        else if (["priBim", "segBim", "terBim", "quarBim"].includes(filterKey)) {
            setCheckboxBimestres(prev => ({
                ...prev,
                [filterKey]: {
                    ...prev[filterKey],
                    [key]: { selected: !prev[filterKey][key].selected }
                }
            }));
        }
    };

    const isFilterSelected = (filterState) => {
        return Object.values(filterState).some((value) => value.selected);
    };

    // ===================================================
    // APLICAR FILTROS
    // ===================================================
    const aplicarFiltros = async () => {

        const selecionouEscola = isFilterSelected(checkboxEscola);
        const selecionouAnoLetivo = isFilterSelected(checkboxAnoLetivo);

        if (!selecionouEscola) {
            alert("Selecione pelo menos 1 Escola.");
            return;
        }

        if (!selecionouAnoLetivo) {
            alert("Selecione pelo menos 1 Ano Letivo.");
            return;
        }

        const filtrosSelecionados = {
            anoLetivo: Object.entries(checkboxAnoLetivo)
                .filter(([_, v]) => v.selected)
                .map(([_, v]) => v.value),

            escolas: Object.entries(checkboxEscola)
                .filter(([_, v]) => v.selected)
                .map(([_, v]) => v.value),

            series: Object.entries(checkboxSerie)
                .filter(([_, v]) => v.selected)
                .map(([_, v]) => v.value),

            turmas: Object.entries(checkboxTurma)
                .filter(([_, v]) => v.selected)
                .map(([_, v]) => v.label),

            diagnosticos: Object.fromEntries(
                Object.entries({
                    "1": checkboxBimestres.priBim,
                    "2": checkboxBimestres.segBim,
                    "3": checkboxBimestres.terBim,
                    "4": checkboxBimestres.quarBim
                }).map(([bim, opcoes]) => {
                    const selecionados = Object.entries(opcoes)
                        .filter(([_, v]) => v.selected)
                        .map(([key]) => key);

                    return [bim, selecionados];
                }).filter(([_, arr]) => arr.length > 0)
            )
        };

        onApplyFilters(filtrosSelecionados);
        atualizarStorage();

        setFiltrosAlterados(false);
        onFilterChange(true);
    };

    // ===================================================
    // LIMPAR FILTROS
    // ===================================================
    const limparFiltros = () => {

        localStorage.removeItem("checkboxAnoLetivo");
        localStorage.removeItem('checkboxEscola');
        localStorage.removeItem('checkboxSerie');
        localStorage.removeItem('checkboxTurma');
        localStorage.removeItem('checkboxBimestres');

        setCheckboxAnoLetivo({
            ano_2023: { label: "2023", value: "2023", selected: false },
            ano_2024: { label: "2024", value: "2024", selected: false },
            ano_2025: { label: "2025", value: "2025", selected: false }
        });

        setCheckboxEscola({
            analia: { label: "EMEFEI ANÁLIA", value: "EMEFEI ANÁLIA DE LUCCA FURLAN", selected: false },
            outra1: { label: "Outra Escola 1", value: "EMEFEI CENTRO", selected: false },
            outra2: { label: "Outra Escola 2", value: "EMEFEI BAIRRO NOVO", selected: false },
        });

        setCheckboxSerie({
            pri_ano: { label: "1º Ano", value: "1", selected: false },
            seg_ano: { label: "2º Ano", value: "2", selected: false },
            ter_ano: { label: "3º Ano", value: "3", selected: false },
            quar_ano: { label: "4º Ano", value: "4", selected: false },
            quin_ano: { label: "5º Ano", value: "5", selected: false },
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

        onFilterChange(true);
    };

    // ===================================================
    // COMPONENTE JSX
    // ===================================================

    return (
        <>
            <div className="filtro">
                <div className="filtros">

                    {/* --- PESQUISA COM LISTA DE SUGESTÕES --- */}
                    {/* O 'stopPropagation' evita que clicar aqui feche a lista imediatamente */}
                    <div className="pesquisas" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            className='input-pesquisa'
                            placeholder='Pesquisa por nome e RA'
                            value={termoBusca}
                            onChange={handleSearchInput}
                            onFocus={() => termoBusca.length > 2 && setMostrandoSugestoes(true)}
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>

                        {/* LISTA FLUTUANTE DE SUGESTÕES */}
                        {mostrandoSugestoes && sugestoes.length > 0 && (
                            <ul className="lista-sugestoes">
                                {sugestoes.map((aluno) => (
                                    <li
                                        key={aluno.codAluno || aluno.ra}
                                        onClick={() => handleSelectSuggestion(aluno)}
                                    >
                                        <div className="sugestao-nome">{aluno.nomeAluno}</div>
                                        <div className="sugestao-ra">RA: {aluno.ra}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* SCROLL DOS FILTROS */}
                    <div className="scroll-filtros">

                        {/* ANO LETIVO */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("anoLetivo")}>
                                <p>ANO LETIVO</p>
                                <i className={`fa-solid ${stdCheckBox.anoLetivo ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>

                            {stdCheckBox.anoLetivo && (
                                Object.entries(checkboxAnoLetivo).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("anoLetivo", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* ESCOLAS */}
                        <div className="dropdown-checkbox">
                            <div className="filter-close" onClick={() => toggleDropdown("escolas")}>
                                <p>ESCOLAS</p>
                                <i className={`fa-solid ${stdCheckBox.escolas ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.escolas && (
                                Object.entries(checkboxEscola).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("escolas", key)}>
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
                            <div className="filter-close" onClick={() => toggleDropdown("serie")}>
                                <p>SÉRIE</p>
                                <i className={`fa-solid ${stdCheckBox.serie ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.serie && (
                                Object.entries(checkboxSerie).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("serie", key)}>
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
                            <div className="filter-close" onClick={() => toggleDropdown("turma")}>
                                <p>TURMA</p>
                                <i className={`fa-solid ${stdCheckBox.turma ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </div>
                            {stdCheckBox.turma && (
                                Object.entries(checkboxTurma).map(([key, value], index) => (
                                    <div key={index} className="item-checkbox" onClick={() => toggleCheckbox("turma", key)}>
                                        <div className="box-checkbox">
                                            {value.selected && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <p>{value.label}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* BIMESTRES */}
                        {["priBim", "segBim", "terBim", "quarBim"].map((bim, idx) => (
                            <div key={idx} className="dropdown-checkbox">
                                <div className="filter-close" onClick={() => toggleDropdown(bim)}>
                                    <p>{["1º BIMESTRE", "2º BIMESTRE", "3º BIMESTRE", "4º BIMESTRE"][idx]}</p>
                                    <i className={`fa-solid ${stdCheckBox[bim] ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                </div>
                                {stdCheckBox[bim] && (
                                    Object.entries(checkboxBimestres[bim]).map(([key, value], index) => (
                                        <div key={index} className="item-checkbox" onClick={() => toggleCheckbox(bim, key)}>
                                            <div className="box-checkbox">
                                                {value.selected && <i className="fa-solid fa-check"></i>}
                                            </div>
                                            <p>{key.toUpperCase()}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>

                    {/* BOTOES */}
                    <div className="botoes-filtros">
                        <div className="bot-aplicar" onClick={() => aplicarFiltros()}>
                            <p>APLICAR FILTROS</p>
                        </div>

                        <div className="bot-limpar" onClick={limparFiltros}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                {/* EXIBIÇÃO DOS FILTROS SELECIONADOS */}
                <div className="mostrar">
                    <div className="mostrar-filtros">
                        <div className='filtros-selecionados'>
                            <p className='filtros-selecionados-p'>FILTROS SELECIONADOS</p>
                        </div>

                        {/* ANO LETIVO */}
                        {isFilterSelected(checkboxAnoLetivo) && (
                            <>
                                <p className='itens-filtro'>ANO LETIVO:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxAnoLetivo)
                                        .filter(([_, v]) => v.selected)
                                        .map(([key, v]) => (
                                            <p key={key} className='filtro-selecionado'>{v.label}</p>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* ESCOLAS */}
                        {isFilterSelected(checkboxEscola) && (
                            <>
                                <p className='itens-filtro'>ESCOLA:</p>
                                <div className="exibir-filtro">
                                    {Object.entries(checkboxEscola)
                                        .filter(([_, v]) => v.selected)
                                        .map(([key, v]) => (
                                            <p key={key} className='filtro-selecionado'>{v.label}</p>
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
                                        .filter(([_, v]) => v.selected)
                                        .map(([key, v]) => (
                                            <p key={key} className='filtro-selecionado'>{v.label}</p>
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
                                        .filter(([_, v]) => v.selected)
                                        .map(([key, v]) => (
                                            <p key={key} className='filtro-selecionado'>{v.label}</p>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* BIMESTRES */}
                        {["priBim", "segBim", "terBim", "quarBim"].map((bim, idx) =>
                            isFilterSelected(checkboxBimestres[bim]) && (
                                <div key={idx}>
                                    <p className='itens-filtro'>{["1º BIMESTRE", "2º BIMESTRE", "3º BIMESTRE", "4º BIMESTRE"][idx]}:</p>
                                    <div className="exibir-filtro">
                                        {Object.entries(checkboxBimestres[bim])
                                            .filter(([_, v]) => v.selected)
                                            .map(([key]) => (
                                                <p key={key} className='filtro-selecionado'>{key.toUpperCase()}</p>
                                            ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filtrar;