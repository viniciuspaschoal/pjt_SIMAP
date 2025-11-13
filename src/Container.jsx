import '../src/container.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import NavComands from './components/NavComands';
import Header from './components/Header';
import HeroHome from './components/HeroHome';
import Filtrar from './components/Filtrar';
import AlunoDetalhes from './components/IndividualAluno';
import TableActualTail from './components/TableActualTail';
import Pagina404 from './components/Pagina404';
import { aplicarFiltros } from './services/alunoService';

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
  const handleApplyFilters = async (filtrosSelecionados) => {
    setFiltrosAtuais(filtrosSelecionados)

    try {
      //busca no backend
      const response = await aplicarFiltros(filtrosSelecionados)
      console.log("✅ Resposta recebida do backend:", response.data)
      setDadosFiltrados(response.data)

      navigate('/geral')
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error)
    }

  };

  // // Navega para detalhes do aluno via id
  // const handleAlunoClick = (aluno) => {
  //   navigate(`/detalhes/${aluno.cod_aluno}`);
  // };

  // Voltar para lista geral
  const voltarParaLista = () => {
    navigate('/geral');
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

        <div
          className={`transition-all duration-300 h-[88%] ${estadoMenu === 'open'
              ? 'ml-64 w-[calc(100%-16rem)]'
              : 'ml-16 w-[calc(100%-4rem)]'
            }`}
        >
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
                // onAlunoClick={handleAlunoClick}
                />
              }
            />
            <Route
              path="/detalhes/:ra"
              element={<AlunoDetalhes onVoltar={voltarParaLista} />}
            />
            {/* Rota padrão para rotas não definidas */}
            <Route path="" element={
              <HeroHome
                clickGeral={clickGeral}
                clickPJ={clickPJ}
                clickSearch={clickSearch}
                clickGauge={clickGauge}
              />
            } />

            <Route path="*" element={<Pagina404 />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Container