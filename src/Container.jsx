import '../src/container.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import NavComands from './components/NavComands';
import Header from './components/Header';
import HeroHome from './components/HeroHome';
import Geral from './components/Geral';
import Filtrar from './components/Filtrar';
import dados from './db/db.json';
import AlunoDetalhes from './components/IndividualAluno';
import TableActualTail from './components/TableActualTail';

function Container() {
  const [estadoMenu, setEstadoMenu] = useState('close');
  const [filtrosAplicados, setFiltrosAplicados] = useState(true);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [filtrosAtuais, setFiltrosAtuais] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // Função para abrir e fechar menu lateral
  function clickMenu() {
    setEstadoMenu(estadoMenu === 'close' ? 'open' : 'close');
  }

  // Função de navegação com confirmação para filtros não aplicados
  function goTo(route) {
    if (location.pathname === '/busca' && !filtrosAplicados) {
      if (!window.confirm('Você tem filtros não aplicados. Deseja sair mesmo assim?')) return;
    }
    navigate(route);
  }

  // Funções de navegação para botões/menu, usadas em HeroHome e NavComands
  function clickHome() { goTo('/home'); }
  function clickBusca() { goTo('/busca'); }
  function clickFilter() { goTo('/filtro'); }
  function clickGuide() { goTo('/guide'); }
  function clickSettings() { goTo('/settings'); }
  function clickGeral() { goTo('/geral'); }
  function clickPJ() { goTo('/projeto'); }
  function clickSearch() { goTo('/busca'); }
  function clickGauge() { goTo('/relatorio'); }

  // Aplica filtros e navega para geral
  const handleApplyFilters = (filtros) => {
    const filtrosComDiagnosticos = { ...filtros };
    ['diagnostico_priBim', 'diagnostico_segBim', 'diagnostico_terBim', 'diagnostico_quarBim']
      .forEach(diag => {
        if (!Array.isArray(filtrosComDiagnosticos[diag])) filtrosComDiagnosticos[diag] = [];
      });
    setFiltrosAtuais(filtrosComDiagnosticos);
    buscarDados(filtrosComDiagnosticos);
    navigate('/geral');
  };

  // Navega para detalhes do aluno via id
  const handleAlunoClick = (aluno) => {
    navigate(`/detalhes/${aluno.cod_aluno}`);
  };

  // Voltar para lista geral
  const voltarParaLista = () => {
    navigate('/geral');
  };

  // Função para buscar dados conforme filtros (mantém sua lógica original)
  const buscarDados = (filtros) => {
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
      if (!escolaData) return;

      serie.forEach(serieSelecionada => {
        const serieData = escolaData[serieSelecionada];
        if (!serieData) return;

        turma.forEach(turmaSelecionada => {
          const turmaData = serieData[turmaSelecionada];
          if (!turmaData) return;

          const alunosFiltrados = turmaData.filter(aluno => {
            const diagnosticoPriBimValido = diagnostico_priBim.length === 0 ||
              diagnostico_priBim.some(filtro =>
                aluno.diagnosticos?.priBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
              );
            const diagnosticoSegBimValido = diagnostico_segBim.length === 0 ||
              diagnostico_segBim.some(filtro =>
                aluno.diagnosticos?.segBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
              );
            const diagnosticoTerBimValido = diagnostico_terBim.length === 0 ||
              diagnostico_terBim.some(filtro =>
                aluno.diagnosticos?.terBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
              );
            const diagnosticoQuarBimValido = diagnostico_quarBim.length === 0 ||
              diagnostico_quarBim.some(filtro =>
                aluno.diagnosticos?.quarBim?.alfabetizacao?.toLowerCase() === filtro.toLowerCase()
              );

            return diagnosticoPriBimValido && diagnosticoSegBimValido && diagnosticoTerBimValido && diagnosticoQuarBimValido;
          });

          resultados = [...resultados, ...alunosFiltrados];
        });
      });
    });

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
          <Routes>
            <Route
              path="/home"
              element={
                <HeroHome
                  clickGeral={clickGeral}
                  clickPJ={clickPJ}
                  clickSearch={clickSearch}
                  clickGauge={clickGauge}
                />
              }
            />
            <Route
              path="/busca"
              element={
                <Filtrar
                  onApplyFilters={handleApplyFilters}
                  onFilterChange={setFiltrosAplicados}
                />
              }
            />
            <Route
              path="/geral"
              element={
                <TableActualTail
                  dados={dadosFiltrados}
                  filtros={filtrosAtuais}
                  onAlunoClick={handleAlunoClick}
                />
              }
            />
            <Route
              path="/detalhes/:id"
              element={<AlunoDetalhes onVoltar={voltarParaLista} />}
            />
            {/* Rota padrão para rotas não definidas */}
            <Route path="*" element={
              <HeroHome
                clickGeral={clickGeral}
                clickPJ={clickPJ}
                clickSearch={clickSearch}
                clickGauge={clickGauge}
              />
            } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Container