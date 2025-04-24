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
        setFiltrosAtuais(filtros) // Salva os filtros aplicados
        buscarDados(filtros) // Chama a função para filtrar os dados
        setEstadoHome('geral') // Redireciona para a tela "geral"
    }

    const handleAlunoClick = (aluno) => {
        setAlunoSelecionado(aluno);
        setEstadoHome('detalhes');
    }

    const voltarParaLista = () => {
        setAlunoSelecionado(null);
        setEstadoHome('geral');
    }

    const buscarDados = (filtros) => {
        const { escolas, serie, turma, diagnostico_inicial, diagnostico_medial, diagnostico_final } = filtros;
    
        // Inicializa um array para armazenar os resultados
        let resultados = [];
    
        // Itera sobre as escolas selecionadas
        escolas.forEach((escolaSelecionada) => {
            const escolaData = dados[escolaSelecionada]; // Obtém os dados da escola
            if (!escolaData) return; // Pula se a escola não tiver dados
    
            // Itera sobre as séries selecionadas
            serie.forEach((serieSelecionada) => {
                const serieData = escolaData[serieSelecionada]; // Obtém os dados da série
                if (!serieData) return; // Pula se a série não existir
    
                // Itera sobre as turmas selecionadas
                turma.forEach((turmaSelecionada) => {
                    const turmaData = serieData[turmaSelecionada]; // Obtém os dados da turma
                    if (!turmaData) return; // Pula se a turma não existir
    
                    // Filtra os alunos com base nos diagnósticos
                    const alunosFiltrados = turmaData.filter((aluno) => {
                        const diagnosticoInicialValido =
                            diagnostico_inicial.length === 0 ||
                            diagnostico_inicial.some((filtro) =>
                                filtro.toLowerCase() in aluno.diagnosticos.inicial
                            );
                        const diagnosticoMedialValido =
                            diagnostico_medial.length === 0 ||
                            diagnostico_medial.some((filtro) =>
                                filtro.toLowerCase() in aluno.diagnosticos.medial
                            );
                        const diagnosticoFinalValido =
                            diagnostico_final.length === 0 ||
                            diagnostico_final.some((filtro) =>
                                filtro.toLowerCase() in aluno.diagnosticos.final
                            );
    
                        // Retorna apenas os alunos que atendem a todos os critérios
                        return diagnosticoInicialValido && diagnosticoMedialValido && diagnosticoFinalValido;
                    });
    
                    // Adiciona os alunos filtrados ao resultado
                    resultados = [...resultados, ...alunosFiltrados];
                });
            });
        });
    
        // Atualiza o estado com os dados filtrados
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
