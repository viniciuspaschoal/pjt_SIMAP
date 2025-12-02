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
import WarningOverlay from './components/WarningOverlay';
import ExitConfirmOverlay from './components/ExitConfirmOverlay';
import { aplicarFiltros } from './services/alunoService';
import Geral from './components/Geral';
import FiltroProjeto from './components/FiltroProjeto';
import { aplicarFiltrosProjeto } from './services/projetoService';
import TableProjetoRecomposicao from './components/TableProjetoRecomposicao'; // Componente da tabela de projetos
import AdminUsuarios from './components/AdminUsuarios';
import RequireRole from './routes/RequireRole';


function Container() {
  const navigate = useNavigate();
  const location = useLocation();

  const [estadoMenu, setEstadoMenu] = useState('close');
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [filtrosAtuais, setFiltrosAtuais] = useState({});

  const [erroServidor, setErroServidor] = useState(false);
  const [filtrosSalvos, setFiltrosSalvos] = useState(true);

  const [mostrarExitModal, setMostrarExitModal] = useState(false);
  const [rotaDestino, setRotaDestino] = useState(null);

  // Controle central de navegação protegida
  function navigateCheck(rota) {
    console.log(">> tentativa de navegação para", rota);
    console.log(">> filtrosSalvos =", filtrosSalvos);

    if (location.pathname === "/busca" && filtrosSalvos === false) {
      console.log(">> BLOQUEADO — filtros não salvos!");
      setRotaDestino(rota);
      setMostrarExitModal(true);
      return;
    }

    console.log(">> navegação permitida");
    navigate(rota);
  }

  // Botões agora precisam usar navigateCheck
  const clickHome = () => navigateCheck('/home');
  const clickBusca = () => navigateCheck('/busca');
  const clickAcesso = () => navigateCheck('/controle-acesso');
  const clickGuide = () => navigateCheck('/guide');
  const clickSettings = () => navigateCheck('/settings');
  const clickGeral = () => navigateCheck('/geral');
  const clickPJ = () => navigateCheck('/projeto');

  const clickSearch = () => navigateCheck('/busca');
  const clickGauge = () => navigateCheck('/relatorio');

  const clickMenu = () => {
    setEstadoMenu(prev => (prev === 'close' ? 'open' : 'close'));
  };

  // === Aplicando filtros ===
  const handleApplyFilters = async (filtrosSelecionados) => {
    setFiltrosAtuais(filtrosSelecionados);

    try {
      const response = await aplicarFiltros(filtrosSelecionados);
      setDadosFiltrados(response.data);

      setFiltrosSalvos(true); // filtros aplicados → pode navegar
      navigate('/tabela-resultados');

    } catch (error) {
      console.error(error);
      setErroServidor(true);
    }
  };

  // Função EXCLUSIVA para receber dados já buscados pelo FiltroProjeto
  const handleProjectSuccess = (dadosProjetos, filtrosUsados) => {
    setDadosFiltrados(dadosProjetos);
    setFiltrosAtuais(filtrosUsados); // Opcional, se você quiser guardar o que foi filtrado
    setFiltrosSalvos(true);

    // Navega para a tabela correta de projetos
    navigate('/projeto-resultados');
  };

  // Função para voltar à lista de resultados
  const voltarParaLista = () => {
    navigate('/tabela-resultados');
  };

  return (
    <>
      <Header estadoMenu={estadoMenu} clickMenu={clickMenu} />

      <div className='flex-conteudo'>

        <NavComands
          estadoMenuLateral={estadoMenu}
          clickHome={clickHome}
          clickBusca={clickBusca}
          clickAcesso={clickAcesso}
          clickGuide={clickGuide}
          clickSettings={clickSettings}
        />

        <div className={`transition-all duration-300 h-[88%] ${estadoMenu === 'open'
          ? 'ml-64 w-[calc(100%-16rem)]'
          : 'ml-16 w-[calc(100%-4rem)]'
          }`}>

          <Routes>

            <Route path="/home" element={
              <HeroHome
                clickGeral={clickGeral}
                clickPJ={clickPJ}
                clickSearch={clickSearch}
                clickGauge={clickGauge}
              />
            } />

            <Route path="/geral" element={
              <Geral onApplyFilters={handleApplyFilters} />
            } />

            <Route path="/projeto" element={
              <FiltroProjeto onApplyFilters={(dados, filtros) => handleProjectSuccess(dados, filtros)} />
            } />

            {/* Tabela para Projetos filtrados */}
            <Route path="/projeto-resultados" element={
              <TableProjetoRecomposicao dados={dadosFiltrados} filtros={filtrosAtuais} />
            } />

            <Route path="/busca" element={
              <Filtrar
                onApplyFilters={handleApplyFilters}
                onFilterChange={(estado) => {
                  console.log(">> Container recebeu onFilterChange:", estado);
                  setFiltrosSalvos(estado);
                }}
              />
            } />

            <Route path="/tabela-resultados" element={
              <TableActualTail dados={dadosFiltrados} filtros={filtrosAtuais} />
            } />

            <Route path="/detalhes/:ra" element={
              <AlunoDetalhes onVoltar={voltarParaLista} />
            } />

            <Route path="" element={<HeroHome
              clickGeral={clickGeral}
              clickPJ={clickPJ}
              clickSearch={clickSearch}
              clickGauge={clickGauge}
            />} />

            <Route
              path="/controle-acesso"
              element={
                <RequireRole roles={["SUPER_ADMIN", "GESTAO"]}>
                  <AdminUsuarios />
                </RequireRole>
              }
            />

            <Route path="*" element={<Pagina404 />} />

          </Routes>
        </div>
      </div>

      {/* Erro de servidor */}
      {erroServidor && (
        <WarningOverlay
          onRetry={() => {
            setErroServidor(false);
            handleApplyFilters(filtrosAtuais);
          }}
          onBack={() => {
            setErroServidor(false);
            navigate('/busca');
          }}
        />
      )}

      {/* Modal de sair sem salvar */}
      {mostrarExitModal && (
        <ExitConfirmOverlay
          onStay={() => setMostrarExitModal(false)}
          onDiscard={() => {
            setMostrarExitModal(false);
            setFiltrosSalvos(true); // considera descartado
            navigate(rotaDestino);
          }}
        />
      )}

    </>
  );
}

export default Container;
