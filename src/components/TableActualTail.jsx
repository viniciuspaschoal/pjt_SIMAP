import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

/**
 * Renderiza uma tabela dinâmica de alunos com colunas fixas (RA, Nome, Escola, etc.)
 * e colunas variáveis por bimestre (Hipótese, Faltas e P.R.A).
 *
 * @component
 * @param {Object[]} dados - Lista de alunos retornada pelo backend.
 * @param {Object} filtros - Objeto contendo os filtros aplicados, incluindo bimestres ativos.
 * @param {Function} onAlunoClick - Função callback chamada ao clicar em um aluno.
 * 
 * @example
 * <TableActualTail
 *   dados={dadosFiltrados}
 *   filtros={filtrosAtuais}
 *   onAlunoClick={(aluno) => console.log(aluno)}
 * />
 */

export default function TableActualTail({ dados, filtros, onAlunoClick }) {
    const [dadosSalvos, setDadosSalvos] = useState([]);
    const navigate = useNavigate(); // Hook de navegação para React Router v6

    // Identifica os bimestres que possuem diagnósticos selecionados no filtro (ex: ["1", "4"])
    const bimestresAtivos = Object.keys(filtros?.diagnosticos || {}).sort(); // Usa filtros para determinar os bimestres ativos

    // Função utilitária para limitar a quantidade de palavras exibidas em textos longos (ex: nome da escola)
    const limitarPalavras = (texto, limite) => {
        if (!texto) return '-';
        const palavras = texto.split(" ");
        if (palavras.length <= limite) return texto;
        return palavras.slice(0, limite).join(" ") + "...";
    };


    // Carregar os dados do sessionStorage quando o componente é montado
    useEffect(() => {
        const dadosSessionStorage = sessionStorage.getItem('dados');
        if (dadosSessionStorage) {
            // Se houver dados no sessionStorage, usa eles
            setDadosSalvos(JSON.parse(dadosSessionStorage));
        }
    }, []); // O efeito executa apenas uma vez, quando o componente é montado

    // Atualiza os dados do estado `dadosSalvos` com os dados da API (caso não tenha dados no sessionStorage)
    useEffect(() => {
        if (dados && dados.length > 0 && dadosSalvos.length === 0) {
            setDadosSalvos(dados); // Usar os dados da API se não houver dados no sessionStorage
        }
    }, [dados, dadosSalvos]); // Esse efeito depende dos dados e dos dadosSalvos

    // Atualiza o sessionStorage sempre que `dadosSalvos` mudar
    useEffect(() => {
        if (dadosSalvos.length > 0) {
            sessionStorage.setItem('dados', JSON.stringify(dadosSalvos));
        }
    }, [dadosSalvos]); // Atualiza o sessionStorage quando os dados salvos mudarem


    const handleBackToSearch = () => {
        navigate('/busca'); // Altere para a rota de busca da sua aplicação
    };

    if (!dados || dados.length === 0) {
        return (
            <div className="flex justify-center items-center bg-gray-100 h-[90vh]">
                <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto">

                    {/* 1. Ícone Visual (Aviso, não erro crítico) */}
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                        {/* Ícone de Aviso (Heroicons) */}
                        <svg
                            className="h-8 w-8 text-yellow-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </div>

                    {/* 2. Texto focado no problema (dados perdidos) */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Dados da busca não encontrados
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Parece que sua sessão anterior expirou ou os dados da tabela foram perdidos. Mas não se preocupe! Por favor, filtre novamente para ver os resultados.
                    </p>

                    {/* 3. Ação Única e Clara */}
                    <div className="flex flex-col w-full">
                        <button
                            onClick={handleBackToSearch}
                            className="w-full px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Voltar e Fazer Nova Busca
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="pt-2 pl-2">
            <div className="tabela-container pr-2">
                <table className="tabela-base border-l-2 border-r-2 border-gray-300">
                    <thead>
                        <tr className="tr-sticky-row1">
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">RA</th>
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">Nome</th>
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">Escola</th>
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">Série</th>
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">Turma</th>
                            <th rowSpan="2" className="cabecalho-tabela th-rowspan-fix">Nº</th>
                            <th rowSpan="1" className="cabecalho-tabela">Inicial</th>

                            {bimestresAtivos.map((bim) => (
                                <th key={bim} colSpan="3" className="cabecalho-tabela">{bim}º Bimestre</th>
                            ))}
                        </tr>

                        <tr className="tr-sticky-row2">
                            <th className="cabecalho-sub">Hipótese</th>
                            {bimestresAtivos.map((bim) => (
                                <React.Fragment key={bim}>
                                    <th className="cabecalho-sub">Hipótese</th>
                                    <th className="cabecalho-sub">Faltas</th>
                                    <th className="cabecalho-sub">P.R.A</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {dadosSalvos.map((aluno) => (
                            <tr key={aluno.codAluno}
                                className="linha-hover"
                                onClick={() => onAlunoClick(aluno)}>

                                <td className="celula-tabela">{aluno.ra}</td>
                                <td className="celula-tabela">{aluno.nomeAluno}</td>
                                <td className="celula-tabela truncate max-w-[200px]">{limitarPalavras(aluno.escola, 2)}</td>
                                <td>{aluno.serie}</td>
                                <td>{aluno.turma}</td>
                                <td>{aluno.nChamada}</td>
                                <td>{aluno.hipoteseInicial ?? "-"}</td>

                                {bimestresAtivos.map((bim) => (
                                    <React.Fragment key={bim}>
                                        <td className="celula-tabela">{aluno[`hipoteseBimestre${bim}`] ?? "-"}</td>
                                        <td className="celula-tabela">{aluno[`faltasBimestre${bim}`] ?? "-"}</td>
                                        <td className="celula-tabela">{aluno[`praBimestre${bim}`] ?? "-"}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
