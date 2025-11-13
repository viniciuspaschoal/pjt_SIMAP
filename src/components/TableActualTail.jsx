import React from "react";

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
    console.log("Dados recebidos tabela:", dados);
    console.log("Filtros aplicados tabela:", filtros);

    // Identifica os bimestres que possuem diagnósticos selecionados no filtro (ex: ["1", "4"])
    const bimestresAtivos = Object.keys(filtros?.diagnosticos || {}).sort();

    // Função utilitária para limitar a quantidade de palavras exibidas em textos longos (ex: nome da escola)
    const limitarPalavras = (texto, limite) => {
        if (!texto) return '-'
        const palavras = texto.split(" ");
        if (palavras.length <= limite) return texto;
        return palavras.slice(0, limite).join(" ") + "...";
    }

    return (
        <>
            <div className="pt-2 pl-2">

                <div className="tabela-container pr-2">

                    <table className="tabela-base border-l-2 border-r-2 border-gray-300">

                        <thead>

                            {/* Cabeçalho principal */}
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

                            {/* Subcabeçalhos */}
                            <tr className="tr-sticky-row2">
                                <th className="cabecalho-sub">Hipotese</th>

                                {/* Para cada bimestre ativo, cria as 3 subcolunas: Hipótese, Faltas e P.R.A */}
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
                            {dados.map((aluno) => (
                                <tr key={aluno.codAluno || index}
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
        </>
    )
}