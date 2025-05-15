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


    const handleApplyFilters = (filtros) => {
        console.log("Filtros recebidos no Container:", filtros);

        // Copia o objeto de filtros
        const filtrosComDiagnosticos = { ...filtros };

        // Confirma que cada filtro de diagnóstico é um array, se não, inicializa vazio
        const diagnosticos = [
            "diagnostico_priBim",
            "diagnostico_segBim",
            "diagnostico_terBim",
            "diagnostico_quarBim"
        ];

        diagnosticos.forEach((diagnostico) => {
            if (!Array.isArray(filtrosComDiagnosticos[diagnostico])) {
                filtrosComDiagnosticos[diagnostico] = [];
            }
        });

        console.log("Filtros processados:", filtrosComDiagnosticos);

        setFiltrosAtuais(filtrosComDiagnosticos);

        buscarDados(filtrosComDiagnosticos);

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
        console.log("Filtros recebidos na busca:", filtros);

        const {
            escolas,
            serie,
            turma,
            diagnostico_priBim = [],
            diagnostico_segBim = [],
            diagnostico_terBim = [],
            diagnostico_quarBim = []
        } = filtros;

        let resultados = [];

        escolas.forEach(escolaSelecionada => {
            const escolaData = dados[escolaSelecionada];
            if (!escolaData) {
                console.log(`Escola não encontrada: ${escolaSelecionada}`);
                return;
            }
            console.log(`Escola selecionada: ${escolaSelecionada} Dados da escola:`, escolaData);

            serie.forEach(serieSelecionada => {
                const serieData = escolaData[serieSelecionada];
                if (!serieData) {
                    console.log(`Série não encontrada: ${serieSelecionada}`);
                    return;
                }
                console.log(`Série selecionada: ${serieSelecionada} Dados da série:`, serieData);

                turma.forEach(turmaSelecionada => {
                    const turmaData = serieData[turmaSelecionada];
                    if (!turmaData) {
                        console.log(`Turma não encontrada: ${turmaSelecionada}`);
                        return;
                    }
                    console.log(`Turma selecionada: ${turmaSelecionada} Dados da turma:`, turmaData);

                    const alunosFiltrados = turmaData.filter((aluno) => {
                        const diagnosticoPriBimValido =
                          diagnostico_priBim.length === 0 ||
                          diagnostico_priBim.some((filtro) =>
                            aluno.diagnosticos?.priBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
                          );
                        const diagnosticoSegBimValido =
                          diagnostico_segBim.length === 0 ||
                          diagnostico_segBim.some((filtro) =>
                            aluno.diagnosticos?.segBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
                          );
                        const diagnosticoTerBimValido =
                          diagnostico_terBim.length === 0 ||
                          diagnostico_terBim.some((filtro) =>
                            aluno.diagnosticos?.terBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
                          );
                        const diagnosticoQuarBimValido =
                          diagnostico_quarBim.length === 0 ||
                          diagnostico_quarBim.some((filtro) =>
                            aluno.diagnosticos?.quarBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
                          );
                      
                        return (
                          diagnosticoPriBimValido &&
                          diagnosticoSegBimValido &&
                          diagnosticoTerBimValido &&
                          diagnosticoQuarBimValido
                        );
                      });                      

                    console.log(`Alunos filtrados para a turma ${turmaSelecionada}:`, alunosFiltrados);

                    resultados = [...resultados, ...alunosFiltrados];
                });
            });
        });

        console.log("Resultado final dos dados filtrados:", resultados);
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
                        <TableActualTail
                            dados={dadosFiltrados}
                            filtros={filtrosAtuais}
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
