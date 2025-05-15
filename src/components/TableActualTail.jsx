import './tableStudents.css';

function TableActualTail({ dados, filtros, onAlunoClick }) {
    console.log("Dados recebidos tabela:", dados); 
    console.log("Filtros aplicados tabela:", filtros);  
    
    return (
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

            {/* Coluna fixa: Declaração */}
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

            {/* Hipótese Inicial */}
            <HipoteseInicial dados={dados} />

            {/* 1º BIMESTRE */}
            {Array.isArray(filtros.diagnostico_priBim) && filtros.diagnostico_priBim.length > 0 && (
                <Diagnostico
                    titulo="1º BIMESTRE"
                    dados={dados}
                    tipoDiagnostico="priBim"
                    filtros={filtros.diagnostico_priBim}
                />
            )}

            {/* 2º BIMESTRE */}
            {Array.isArray(filtros.diagnostico_segBim) && filtros.diagnostico_segBim.length > 0 && (
                <Diagnostico
                    titulo="2º BIMESTRE"
                    dados={dados}
                    tipoDiagnostico="segBim"
                    filtros={filtros.diagnostico_segBim}
                />
            )}

            {/* 3º BIMESTRE */}
            {Array.isArray(filtros.diagnostico_terBim) && filtros.diagnostico_terBim.length > 0 && (
                <Diagnostico
                    titulo="3º BIMESTRE"
                    dados={dados}
                    tipoDiagnostico="terBim"
                    filtros={filtros.diagnostico_terBim}
                />
            )}

            {/* 4º BIMESTRE */}
            {Array.isArray(filtros.diagnostico_quarBim) && filtros.diagnostico_quarBim.length > 0 && (
                <Diagnostico
                    titulo="4º BIMESTRE"
                    dados={dados}
                    tipoDiagnostico="quarBim"
                    filtros={filtros.diagnostico_quarBim}
                />
            )}
        </div>
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
                        <p>{aluno.mapaAlfabetizacao?.inicial ?? "-"}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Diagnostico = ({ titulo, dados, tipoDiagnostico, filtros }) => {
    if (!filtros || filtros.length === 0) return null;

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
                            <p>{diag.frequencia ?? "-"}</p>
                            <p>{diag.projeto || "-"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TableActualTail;
