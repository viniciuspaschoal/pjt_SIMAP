import '../src/container.css'
import NavComands from './components/NavComands'
import Header from './components/Header'
import HeroHome from './components/HeroHome'
import Geral from './components/Geral'
import Filtrar from './components/Filtrar'
import dados from './db/db.json'
import TableStudents from "./components/TableStudents"
import AlunoDetalhes from './components/IndividualAluno'
import { useState } from 'react'
import TableActualTail from './components/TableActualTail'

function Container() {
    const [estadoMenu, setEstadoMenu] = useState('close')
    const [estadoHome, setEstadoHome] = useState('home')
    const [filtrosAplicados, setFiltrosAplicados] = useState(true)
    const [dadosFiltrados, setDadosFiltrados] = useState([])
    const [filtrosAtuais, setFiltrosAtuais] = useState({}) // Novo estado para armazenar os filtros aplicados
    const [alunoSelecionado, setAlunoSelecionado] = useState(null); // Novo estado

    //função para abrir e fechar menu
    function clickMenu() {
        setEstadoMenu(estadoMenu === 'close' ? 'open' : 'close')
    }

    const handleNavigation = (navigateTo) => {
        if (estadoHome === 'busca' && !filtrosAplicados) {
            const confirmLeave = window.confirm(
                "Você tem filtros não aplicados. Deseja sair mesmo assim?"
            )
            if (!confirmLeave) {
                return; // Não muda de estado se o usuário cancelar
            }
        }
        setEstadoHome(navigateTo)
    }

    function clickHome() {
        handleNavigation('home')
    }

    function clickBusca() {
        handleNavigation('busca')
    }

    function clickFilter() {
        handleNavigation('filtro')
    }

    function clickGuide() {
        handleNavigation('guide')
    }

    function clickSettings() {
        handleNavigation('settings')
    }

    const handleFilterChange = (isApplied) => {
        setFiltrosAplicados(isApplied)
    }

    function clickGeral() {
        setEstadoHome('geral')
    }

    function clickPJ() {
        setEstadoHome('projeto')
    }

    function clickSearch() {
        setEstadoHome('busca')
    }

    function clickGauge() {
        setEstadoHome('relatorio')
    }

    // Atualiza os filtros aplicados e busca os dados
    const handleApplyFilters = (filtros) => {
        const mapDiagnostico = {
            "1º BIMESTRE": "diagnostico_priBim",
            "2º BIMESTRE": "diagnostico_segBim",
            "3º BIMESTRE": "diagnostico_terBim",
            "4º BIMESTRE": "diagnostico_quarBim"
        };
    
        // Monta um novo objeto com os filtros + os diagnósticos de cada bimestre aplicados
        const filtrosComDiagnostico = {
            ...filtros,
        };
    
        filtros.periodo_bimestral.forEach(bim => {
            const chave = mapDiagnostico[bim];
            if (chave) {
                filtrosComDiagnostico[chave] = ["Hipótese"]; // ou adicionar outros campos como "Faltas", "P.R.A."
            }
        });
    
        setFiltrosAtuais(filtrosComDiagnostico);
        buscarDados(filtros); // essa busca usa o objeto original
        setEstadoHome('geral');
    };

    const handleAlunoClick = (aluno) => {
        setAlunoSelecionado(aluno);
        setEstadoHome('detalhes');
    }

    const voltarParaLista = () => {
        setAlunoSelecionado(null);
        setEstadoHome('geral');
    }

    const buscarDados = (filtros) => {
        const { escolas, serie, turma, periodo_bimestral, alfabetizacao } = filtros;

        const mapChave = {
            "1º BIMESTRE": "priBim",
            "2º BIMESTRE": "segBim",
            "3º BIMESTRE": "terBim",
            "4º BIMESTRE": "quarBim"
        };

        let resultados = [];

        escolas.forEach((escolaSelecionada) => {
            const escolaData = dados[escolaSelecionada];
            if (!escolaData) return;

            serie.forEach((serieSelecionada) => {
                const serieData = escolaData[serieSelecionada];
                if (!serieData) return;

                turma.forEach((turmaSelecionada) => {
                    const turmaData = serieData[turmaSelecionada];
                    if (!turmaData) return;

                    const alunosFiltrados = turmaData.filter((aluno) => {
                        // Se não houver filtro, retorna todos
                        if (periodo_bimestral.length === 0 && alfabetizacao.length === 0) {
                            return true;
                        }
                    
                        return periodo_bimestral.every((filtro) => {
                            const chave = mapChave[filtro];
                            const nivel = aluno.diagnosticos?.[chave]?.alfabetizacao;
                            return nivel && alfabetizacao.includes(nivel);
                        });
                    });
                    

                    resultados = [...resultados, ...alunosFiltrados];
                });
            });
        });

        console.log("Alunos encontrados com os filtros aplicados:", resultados);
        setDadosFiltrados(resultados);
    };




    return (
        <>
            <Header estadoMenu={estadoMenu} clickMenu={clickMenu} />

            <div className='flex-conteudo'>
                <NavComands
                    estadoMenuLateral={estadoMenu}
                    clickHome={clickHome}
                    clickBusca={clickBusca}
                    clickFilter={clickFilter}
                    clickGuide={clickGuide}
                    clickSettings={clickSettings}
                />

                <div className="conteudo-geral">
                    {estadoHome === 'home' && (
                        <HeroHome
                            estadoHome={estadoHome}
                            clickGauge={clickGauge}
                            clickGeral={clickGeral}
                            clickPJ={clickPJ}
                            clickSearch={clickSearch}
                        />
                    )}
                    {estadoHome === 'geral' && (
                        // <TableStudents
                        //     dados={dadosFiltrados}
                        //     filtros={filtrosAtuais} // Passa os filtros para a tabela
                        //     onAlunoClick={handleAlunoClick}
                        // />
                        <TableActualTail
                            dados={dadosFiltrados}
                            filtros={filtrosAtuais} // Passa os filtros para a tabela
                            onAlunoClick={handleAlunoClick}
                        />
                    )}
                    {estadoHome === 'busca' && (
                        <Filtrar
                            onApplyFilters={handleApplyFilters}
                            onFilterChange={handleFilterChange}
                        />
                    )}

                    {estadoHome === 'detalhes' && alunoSelecionado && (
                        <AlunoDetalhes aluno={alunoSelecionado} onVoltar={voltarParaLista} />
                    )}

                </div>
            </div>
        </>
    )
}

export default Container
