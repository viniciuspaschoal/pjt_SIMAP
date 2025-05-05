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
                

                {/* 1ºBimestre */}
                {filtros.diagnostico_priBim?.length > 0 && (
                    <Diagnostico
                        titulo="1ºBimestre"
                        dados={dados}
                        tipoDiagnostico="priBim"
                        filtros={filtros.diagnostico_priBim}
                    />
                )}

                {/* 2ºBimestre */}
                {filtros.diagnostico_segBim?.length > 0 && (
                    <Diagnostico
                        titulo="2ºBimestre"
                        dados={dados}
                        tipoDiagnostico="segBim"
                        filtros={filtros.diagnostico_segBim}
                    />
                )}

                {/* 3ºBimestre */}
                {filtros.diagnostico_terBim?.length > 0 && (
                    <Diagnostico
                        titulo="3ºBimestre"
                        dados={dados}
                        tipoDiagnostico="terBim"
                        filtros={filtros.diagnostico_terBim}
                    />
                )}

                {/* Diagnóstico Final */}
                {filtros.diagnostico_quarBim?.length > 0 && (
                    <Diagnostico
                        titulo="4ºBimestre"
                        dados={dados}
                        tipoDiagnostico="quarBim"
                        filtros={filtros.diagnostico_quarBim}
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

const Diagnostico = ({ titulo, dados, tipoDiagnostico }) => {
    return (
        <div className="colunas">
            <div className="coluna-diagnosticos">
                <div className="colun-principal cabecalho">
                    <p>{titulo}</p>
                </div>
                <div className="sub-colun">
                    <p>Hipótese</p>
                    <p>Faltas</p>
                    <p>P.R.A.</p>
                </div>
                {dados.map((aluno) => {
                    const diag = aluno.diagnosticos?.[tipoDiagnostico] || {};
                    return (
                        <div key={aluno.ra} className="conteudo-topicos">
                            <p>{diag.alfabetizacao || "-"}</p>
                            <p>{diag.frequencia || "-"}</p>
                            <p>{diag.projeto || "-"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TableActualTail;
