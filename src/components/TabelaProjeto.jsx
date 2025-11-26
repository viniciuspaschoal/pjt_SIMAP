// Importa a biblioteca React, necessária para criar componentes funcionais
import React from 'react';


// Componente funcional TabelaProjeto, que recebe "dados" como propriedade (props)
const TabelaProjeto = ({ dados }) => {
    // Se não existirem dados ou não existir o cabeçalho, não renderiza nada (retorna null)
    if (!dados || !dados.cabecalho) return null;

    // Desestruturação: pega "cabecalho" e "alunos" de dentro de "dados"
    const { cabecalho, alunos } = dados;

    // ---------------------------
    //       LÓGICA DE DATAS
    // ---------------------------

    // Pega o array de datas do cabeçalho, se não existir, usa um array vazio
    const rawDatas = cabecalho.datas || [];

    // Cria um array com exatamente 10 posições para as colunas de datas
    // Se não tiver 10 datas, preenche o restante com string vazia ''
    const colunasDatas = Array(10).fill('').map((_, i) => rawDatas[i] || '');

    // Quantidade de colunas de datas (neste caso, sempre 10, pelo Array(10))
    const qtdDatas = colunasDatas.length;

    // Calcula o total de colunas da tabela:
    // 7 colunas fixas + quantidade de datas + 1 coluna de observações
    const totalColunas = 7 + qtdDatas + 1;

    // Função auxiliar para converter o número do mês (string) para o nome em português
    const formatarMes = (mes) => {
        // Objeto que mapeia "01", "02", etc., para o nome do mês em português
        const meses = {
            "01": "JANEIRO", "02": "FEVEREIRO", "03": "MARÇO", "04": "ABRIL",
            "05": "MAIO", "06": "JUNHO", "07": "JULHO", "08": "AGOSTO",
            "09": "SETEMBRO", "10": "OUTUBRO", "11": "NOVEMBRO", "12": "DEZEMBRO"
        };

        // Retorna o nome do mês correspondente, ou o próprio valor se não achar
        return meses[mes] || mes;
    };

    // ---------------------------
    //           ESTILOS
    // ---------------------------

    // Classe base para células, usada tanto em cabeçalhos quanto no corpo da tabela
    const cellBase = "border border-black px-1 align-middle";

    // Estilos para cabeçalhos em fundo verde, texto branco e tamanho de fonte pequeno
    const headerGreen = `${cellBase} bg-[#1b5e3e] text-white font-bold py-1 text-xs`;

    // Estilos para cabeçalhos em fundo branco, texto preto e tamanho de fonte pequeno
    const headerWhite = `${cellBase} bg-white text-black font-bold py-1 text-xs`;

    // Estilo base das células do corpo da tabela (linhas de alunos)
    const bodyCell = `${cellBase} text-center text-xs h-6`;

    // Retorno do JSX (estrutura visual do componente)
    return (
        // Div container que ocupa toda a largura disponível, com rolagem horizontal se necessário
        <div className="w-[78vw] overflow-x-auto bg-blue-600 shadow-sm">

            {/* Tabela ocupando 100% da largura, com bordas colapsadas */}
            <table className="w-full border-collapse border-2 border-black font-sans text-black">

                {/* CABEÇALHO DA TABELA */}
                <thead>

                    {/* Linha 1: Informações da escola, ano e mês */}
                    <tr className="bg-white">
                        {/* "colSpan={totalColunas}" faz essa célula ocupar todas as colunas da tabela */}
                        <th
                            colSpan={totalColunas}
                            className="border border-black border-b-0 px-2 pt-2 pb-1 align-middle bg-white text-black"
                        >
                            {/* Div interna para organizar o conteúdo em duas partes (esquerda e direita) */}
                            <div className="flex justify-between w-full text-xs">
                                {/* Parte esquerda: Nome da unidade escolar */}
                                <div>
                                    <span className="font-bold">UNIDADE ESCOLAR: </span>
                                    <span className="font-normal uppercase">{cabecalho.escola}</span>
                                </div>
                                {/* Parte direita: Ano e mês */}
                                <div>
                                    <span className="font-bold">ANO: </span>
                                    <span className="font-normal mr-4">{cabecalho.ano}</span>
                                    <span className="font-bold">MÊS: </span>
                                    {/* Usa a função formatarMes para converter o mês numérico para texto */}
                                    <span className="font-normal uppercase">{formatarMes(cabecalho.mes)}</span>
                                </div>
                            </div>
                        </th>
                    </tr>

                    {/* Linha 2: Informação do(a) professor(a) */}
                    <tr className="bg-white">
                        <th
                            colSpan={totalColunas}
                            className="border border-black border-t-0 px-2 pb-2 pt-0 text-left align-middle bg-white text-black text-xs"
                        >
                            <span className="font-bold">PROFESSOR (A): </span>
                            {/* Nome do professor em maiúsculas */}
                            <span className="font-normal uppercase">{cabecalho.professor}</span>
                        </th>
                    </tr>

                    {/* ------------------------------- */}
                    {/*   LINHA DE CABEÇALHOS VERDES    */}
                    {/* ------------------------------- */}
                    <tr>
                        {/* Coluna "TURMA" ocupando 3 colunas */}
                        <th colSpan={3} className={headerGreen}>
                            TURMA: {cabecalho.grupoProjeto}
                        </th>

                        {/* Colunas para "HORÁRIO DE ATENDIMENTO" */}
                        <th colSpan={2} className={headerGreen}>
                            HORÁRIO DE ATENDIMENTO
                        </th>

                        {/* Colunas que mostram o horário do projeto (ou "-" se não houver) */}
                        <th colSpan={3} className={headerWhite}>
                            {cabecalho.horarioProjeto || "-"}
                        </th>

                        {/* Colunas para "GRUPO" */}
                        <th colSpan={3} className={headerGreen}>
                            GRUPO
                        </th>

                        {/* Colunas com o nome do grupo do projeto */}
                        <th colSpan={4} className={headerWhite}>
                            {cabecalho.grupoProjeto}
                        </th>

                        {/* Coluna de "OBSERVAÇÕES", ocupando 3 linhas verticalmente (rowSpan={3}) */}
                        <th rowSpan={3} className={`${headerGreen} min-w-[13vw]`}>
                            OBSERVAÇÕES
                        </th>
                    </tr>

                    {/* Linha que define as colunas fixas e a área das DATAS */}
                    <tr>
                        {/* Coluna "Nº" com largura pequena, ocupando 2 linhas de altura */}
                        <th rowSpan={2} className={`${headerGreen} w-8`}>
                            Nº
                        </th>

                        {/* Coluna "NOME COMPLETO" com largura mínima maior (para empurrar a tabela) */}
                        <th rowSpan={2} className={`${headerGreen} min-w-[250px] text-center`}>
                            NOME COMPLETO
                        </th>

                        {/* Coluna "RA", ocupando 2 linhas */}
                        <th rowSpan={2} className={`${headerGreen} w-18`}>
                            RA
                        </th>

                        {/* Coluna "ANO/TURMA", ocupando 2 linhas */}
                        <th rowSpan={2} className={`${headerGreen} w-20`}>
                            ANO/TURMA
                        </th>

                        {/* Coluna "TURNO DA MATRÍCULA", ocupando 2 linhas */}
                        <th rowSpan={2} className={`${headerGreen} w-24 leading-tight text-[10px]`}>
                            TURNO DA MATRÍCULA
                        </th>

                        {/* Cabeçalho que agrupa todas as colunas de datas */}
                        <th colSpan={qtdDatas} className={headerGreen}>
                            DATAS
                        </th>
                    </tr>

                    {/* Linha que mostra cada dia nas colunas de datas */}
                    <tr>
                        {/* Percorre o array de colunasDatas para criar uma célula para cada data */}
                        {colunasDatas.map((dia, index) => (
                            // Cada "th" representa uma coluna de dia (ex: 01, 02, 03...)
                            <th
                                key={index}
                                className={`${cellBase} bg-white text-black text-center w-8 text-[10px]`}
                            >
                                {/* Se houver um valor em "dia", formata para sempre ter 2 dígitos (01, 02, etc.) */}
                                {dia ? String(dia).padStart(2, '0') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* CORPO DA TABELA (LISTA DE ALUNOS) */}
                <tbody>
                    {/* Percorre o array de alunos para criar uma linha por aluno */}
                    {alunos.map((aluno) => (
                        // "key={aluno.numero}" ajuda o React a identificar cada linha de forma única
                        <tr
                            key={aluno.numero}
                            className="hover:bg-green-50 transition-colors"
                        >
                            {/* Coluna com o número do aluno (Nº) em negrito */}
                            <td className={`${bodyCell} font-bold`}>
                                {aluno.numero}
                            </td>

                            {/* Coluna com o nome do aluno, alinhado à esquerda */}
                            <td className={`${bodyCell} text-left px-2 whitespace-nowrap`}>
                                {aluno.nome}
                            </td>

                            {/* Coluna com o RA do aluno, ou "-" se não tiver RA */}
                            <td className={bodyCell}>
                                {aluno.ra || "-"}
                            </td>

                            {/* Coluna com o ano e a turma (ex: "5º A") */}
                            <td className={bodyCell}>
                                {aluno.ano}º {aluno.turma}
                            </td>

                            {/* Coluna com o turno da matrícula, com fonte menor */}
                            <td className={`${bodyCell} text-[10px]`}>
                                {aluno.turnoMatricula}
                            </td>

                            {/* Colunas de presenças/faltas, uma para cada data */}
                            {colunasDatas.map((dia, i) => {
                                // Se a posição da data estiver vazia, retorna apenas uma célula vazia
                                if (!dia) {
                                    return (
                                        <td key={i} className={bodyCell}></td>
                                    );
                                }

                                // Formata o dia para ter 2 dígitos (ex: "1" vira "01")
                                const diaKey = String(dia).padStart(2, '0');

                                // Pega o status de frequência daquele dia para aquele aluno
                                // aluno.frequenciaPorData deve ser um objeto, ex: { "01": "true", "02": "false" }
                                const statusRaw = aluno.frequenciaPorData
                                    ? aluno.frequenciaPorData[diaKey]
                                    : null;

                                // Valor padrão a ser exibido na célula (travessão)
                                let displayStatus = '–';

                                // Classe de texto a ser aplicada (para colorir faltas, por exemplo)
                                let textClass = '';

                                // Se status for "true", significa compareceu (C)
                                if (statusRaw === "true") {
                                    displayStatus = 'C';
                                }
                                // Se status for "false", significa falta (F) e fica em vermelho
                                else if (statusRaw === "false") {
                                    displayStatus = 'F';
                                    textClass = 'text-red-600 font-bold';
                                }

                                // Retorna a célula com o status formatado (C, F ou –)
                                return (
                                    <td
                                        key={i}
                                        className={`${bodyCell} ${textClass}`}
                                    >
                                        {displayStatus}
                                    </td>
                                );
                            })}

                            {/* Coluna de observações do aluno (texto livre) */}
                            <td className="border border-black px-1 text-left align-middle text-[10px] break-words leading-3 py-1">
                                {aluno.observacao}
                            </td>
                        </tr>
                    ))}

                    {/* Caso o array de alunos esteja vazio, mostra uma linha dizendo "Sem alunos." */}
                    {alunos.length === 0 && (
                        <tr>
                            <td
                                colSpan={totalColunas}
                                className="text-center py-4 text-xs text-gray-500"
                            >
                                Sem alunos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Exporta o componente para ser usado em outros arquivos
export default TabelaProjeto;
