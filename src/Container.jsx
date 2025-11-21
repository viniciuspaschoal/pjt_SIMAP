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
  const clickFilter = () => navigateCheck('/busca');
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
          clickFilter={clickFilter}
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
              <Geral onApplyFilters={handleApplyFilters}/>
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
