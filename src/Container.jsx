import '../src/container.css'
import NavComands from './components/NavComands'
import Header from './components/Header'
import HeroHome from './components/HeroHome'
import Geral from './components/Geral'
import Filtrar from './components/Filtrar'
import dados from './db/db.json'
import TableStudents from "./components/TableStudents"
import { useState } from 'react'

function Container() {
    const [estadoMenu, setEstadoMenu] = useState('close')
    const [estadoHome, setEstadoHome] = useState('home')
    const [filtrosAplicados, setFiltrosAplicados] = useState(true)
    const [dadosFiltrados, setDadosFiltrados] = useState([])
    const [filtrosAtuais, setFiltrosAtuais] = useState({}) // Novo estado para armazenar os filtros aplicados

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

    const buscarDados = (filtros) => {
        const { escolas, serie, turma, diagnostico_inicial, diagnostico_medial, diagnostico_final } = filtros;
    
        const resultados = [];
    
        escolas.forEach((escola) => {
            if (dados[escola]) {
                const series = dados[escola][serie];
                if (series) {
                    const turmas = series[turma];
                    if (turmas) {
                        const filtrados = turmas.filter((aluno) => {
                            // Verifica diagnósticos apenas se os filtros foram aplicados
                            const diagnosticoInicialValido =
                                diagnostico_inicial.length === 0 ||
                                diagnostico_inicial.some((filtro) => aluno.diagnosticos.inicial[filtro.toLowerCase()]);
                            const diagnosticoMedialValido =
                                diagnostico_medial.length === 0 ||
                                diagnostico_medial.some((filtro) => aluno.diagnosticos.medial[filtro.toLowerCase()]);
                            const diagnosticoFinalValido =
                                diagnostico_final.length === 0 ||
                                diagnostico_final.some((filtro) => aluno.diagnosticos.final[filtro.toLowerCase()]);
    
                            return diagnosticoInicialValido && diagnosticoMedialValido && diagnosticoFinalValido;
                        });
    
                        resultados.push(...filtrados);
                    }
                }
            }
        });
    
        setDadosFiltrados(resultados);
    }

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
                        <TableStudents
                            dados={dadosFiltrados}
                            filtros={filtrosAtuais} // Passa os filtros para a tabela
                        />
                    )}
                    {estadoHome === 'busca' && (
                        <Filtrar
                            onApplyFilters={handleApplyFilters}
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Container
