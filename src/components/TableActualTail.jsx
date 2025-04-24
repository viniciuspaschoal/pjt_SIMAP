import './tableStudents.css';

function TableActualTail({ dados, filtros, onAlunoClick }) {
    return (
        <>
            <div className="tabela-estilizada">

                {/* Coluna fixa: N */}
                <div className="colunas coluna-ra">
                    <div className="coluna-ra-p cabecalho">
                        <p>N</p>
                    </div>
                    {dados.map((aluno) => (
                        <div key={aluno.n} className="linha-ra">
                            <div className="conteudo-topicos">
                                <p>{aluno.n}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna fixa: RA */}
                <div className="colunas coluna-ra">
                    <div className="coluna-ra-p cabecalho">
                        <p>R.A.</p>
                    </div>
                    {dados.map((aluno) => (
                        <div key={aluno.ra} className="linha-ra" onClick={() => onAlunoClick(aluno)}>
                            <div className="conteudo-topicos">
                                <p>{aluno.ra}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna fixa: Nome */}
                <div className="colunas">
                    <div className="coluna-nome cabecalho">
                        <p>NOME</p>
                    </div>
                    {dados.map((aluno) => (
                        <div key={aluno.ra} className="linha-ra" onClick={() => onAlunoClick(aluno)}>
                            <div className="conteudo-topicos">
                                <p className="conteudo-name">{aluno.nome}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna fixa: Nome */}
                <div className="colunas">
                    <div className="coluna-declaracao cabecalho">
                        <p>Declaração</p>
                    </div>
                    {dados.map((aluno) => (
                        <div key={aluno.ra} className="linha-ra" onClick={() => onAlunoClick(aluno)}>
                            <div className="conteudo-topicos">
                                <p className="conteudo-name">{aluno.declaracao}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hipótese inicial */}
                <HipoteseInicial dados={dados}/>
                

                {/* Diagnóstico Inicial */}
                {filtros.diagnostico_inicial?.length > 0 && (
                    <Diagnostico
                        titulo="1ºBimestre"
                        dados={dados}
                        tipoDiagnostico="inicial"
                        filtros={filtros.diagnostico_inicial}
                    />
                )}

                {/* Diagnóstico Medial */}
                {filtros.diagnostico_medial?.length > 0 && (
                    <Diagnostico
                        titulo="DIAGNÓSTICO MEDIAL - NÍVEIS DE PROFICIÊNCIA"
                        dados={dados}
                        tipoDiagnostico="medial"
                        filtros={filtros.diagnostico_medial}
                    />
                )}

                {/* Diagnóstico Final */}
                {filtros.diagnostico_final?.length > 0 && (
                    <Diagnostico
                        titulo="DIAGNÓSTICO FINAL - NÍVEIS DE PROFICIÊNCIA"
                        dados={dados}
                        tipoDiagnostico="final"
                        filtros={filtros.diagnostico_final}
                    />
                )}
            </div>
        </>
    );
}

const HipoteseInicial = ({ dados }) => (
    <div className="colunas">
        <div className="coluna-mapa">
            <div className="colun-hipotese cabecalho">
                <p>Inicial</p>
            </div>
            <div className="sub-colun">
                <p>Hipótese</p>
            </div>

            {dados.map((aluno) => (
                <div key={aluno.ra}>
                    <div className="conteudo-topicos">
                        <p>{aluno.mapaAlfabetizacao.inicial}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Diagnostico = ({ titulo, dados, tipoDiagnostico, filtros }) => {
    // Não renderiza a coluna se nenhum filtro foi aplicado
    if (!filtros || filtros.length === 0) return null;

    return (
        <div className="colunas">
            <div className="coluna-diagnosticos">
                <div className="colun-principal cabecalho">
                    <p>{titulo}</p>
                </div>
                <div className="sub-colun">
                    {filtros.includes("Hipótese") && <p>Hipótese</p>}
                    {filtros.includes("Faltas") && <p>Faltas</p>}
                    {filtros.includes("P.R.A.") && <p>P.R.A.</p>}
                </div>
                {dados.map((aluno) => (
                    <div key={aluno.ra} className="conteudo-topicos">
                        {filtros.includes("Hipótese") && <p>{aluno.diagnosticos[tipoDiagnostico].hipotese}</p>}
                        {filtros.includes("Faltas") && <p>{aluno.diagnosticos[tipoDiagnostico].frequencia}</p>}
                        {filtros.includes("P.R.A.") && <p>{aluno.diagnosticos[tipoDiagnostico].projeto}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableActualTail;
