import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function TableActualTail({ dados, filtros, onAlunoClick }) {

    // Guarda os dados carregados (da API ou do sessionStorage)
    const [dadosSalvos, setDadosSalvos] = useState([]);

    // Guarda os filtros carregados (da API ou do sessionStorage)
    const [filtrosSalvos, setFiltrosSalvos] = useState({});

    const navigate = useNavigate();


    /* -----------------------------------------------------------
     * 1) Carregar dados e filtros do sessionStorage ao montar
     * ----------------------------------------------------------- */
    useEffect(() => {
        const dadosSession = sessionStorage.getItem('dados');
        const filtrosSession = sessionStorage.getItem('filtros');

        if (dadosSession) {
            setDadosSalvos(JSON.parse(dadosSession));
        }

        if (filtrosSession) {
            setFiltrosSalvos(JSON.parse(filtrosSession));
        }
    }, []);


    /* -----------------------------------------------------------
     * 2) Quando receber dados novos da API:
     *    - Salva no estado
     *    - Salva no sessionStorage
     *    - Salva filtros também
     * ----------------------------------------------------------- */
    useEffect(() => {
        if (dados && dados.length > 0) {
            setDadosSalvos(dados);
            sessionStorage.setItem('dados', JSON.stringify(dados));

            // Salvar os filtros recebidos via props
            sessionStorage.setItem('filtros', JSON.stringify(filtros));
            setFiltrosSalvos(filtros);
        }
    }, [dados]);


    /* -----------------------------------------------------------
     * 3) Determinar os bimestres ativos
     *    Após refresh, a prop "filtros" vem vazia → por isso,
     *    usamos os filtros salvos no sessionStorage.
     * ----------------------------------------------------------- */
    const filtrosValidos = filtros?.diagnosticos
        ? filtros.diagnosticos
        : filtrosSalvos?.diagnosticos || {};

    const bimestresAtivos = Object.keys(filtrosValidos).sort();


    /* -----------------------------------------------------------
     * 4) Função utilitária para reduzir nomes longos
     * ----------------------------------------------------------- */
    const limitarPalavras = (texto, limite) => {
        if (!texto) return "-";
        const partes = texto.split(" ");
        return partes.length <= limite
            ? texto
            : partes.slice(0, limite).join(" ") + "...";
    };


    /* -----------------------------------------------------------
     * 5) Se não houver dados, mostrar aviso
     *    (Isso só acontece se nem API, nem sessionStorage
     *     tiverem dados — ou se foi apagado)
     * ----------------------------------------------------------- */
    if (!dadosSalvos || dadosSalvos.length === 0) {
        return (
            <div className="flex justify-center items-center bg-gray-100 h-[90vh]">
                <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto">

                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
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

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Dados da busca não encontrados
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Parece que sua sessão anterior expirou ou os dados foram perdidos.
                        Por favor, realize uma nova busca.
                    </p>

                    <button
                        onClick={() => navigate('/busca')}
                        className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-200"
                    >
                        Voltar e Fazer Nova Busca
                    </button>
                </div>
            </div>
        );
    }


    /* -----------------------------------------------------------
     * 6) Renderização da tabela final
     * ----------------------------------------------------------- */
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
                                <th key={bim} colSpan="3" className="cabecalho-tabela">
                                    {bim}º Bimestre
                                </th>
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
                                onClick={() => onAlunoClick(aluno)}
                            >
                                <td className="celula-tabela">{aluno.ra}</td>
                                <td className="celula-tabela">{aluno.nomeAluno}</td>
                                <td className="celula-tabela truncate max-w-[200px]">
                                    {limitarPalavras(aluno.escola, 2)}
                                </td>
                                <td>{aluno.serie}</td>
                                <td>{aluno.turma}</td>
                                <td>{aluno.nChamada}</td>
                                <td>{aluno.hipoteseInicial ?? "-"}</td>

                                {bimestresAtivos.map((bim) => (
                                    <React.Fragment key={bim}>
                                        <td className="celula-tabela">
                                            {aluno[`hipoteseBimestre${bim}`] ?? "-"}
                                        </td>
                                        <td className="celula-tabela">
                                            {aluno[`frequenciaBimestre${bim}`] ?? "-"}
                                        </td>
                                        <td className="celula-tabela">
                                            {aluno[`grupoProjetoBimestre${bim}`] ?? "NÃO"}
                                        </td>
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
