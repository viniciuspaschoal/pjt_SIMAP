import './tableStudents.css';

function TableStudents({ dados, filtros }) {
    return (
        <>
            <div className="tabela-estilizada">

                {/* Coluna fixa: RA */}
                <div className="colunas coluna-ra">
                    <div className="coluna-ra-p cabecalho">
                        <p>RA</p>
                    </div>
                    {dados.map((aluno) => (
                        <div key={aluno.ra} className="linha-ra">
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
                        <div key={aluno.ra} className="linha-ra">
                            <div className="conteudo-topicos">
                                <p className="conteudo-name">{aluno.nome}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mapa de Alfabetização */}
                <MapaAlfabetizacao dados={dados} />

                {/* Diagnóstico Inicial */}
                {filtros.diagnostico_inicial?.length > 0 && (
                    <Diagnostico
                        titulo="DIAGNÓSTICO INICIAL - NÍVEIS DE PROFICIÊNCIA"
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

const MapaAlfabetizacao = ({ dados }) => (
    <div className="colunas">
        <div className="coluna-mapa">
            <div className="colun-principal cabecalho">
                <p>MAPA DE ALFABETIZAÇÃO - HIPÓTESE DE ESCRITA</p>
            </div>
            <div className="sub-colun">
                <p>1ºBIMESTRE</p>
                <p>2ºBIMESTRE</p>
                <p>3ºBIMESTRE</p>
                <p>4ºBIMESTRE</p>
            </div>
            {dados.map((aluno) => (
                <div key={aluno.ra}>
                    <div className="conteudo-topicos">
                        <p>{aluno.mapaAlfabetizacao.bimestre1}</p>
                        <p>{aluno.mapaAlfabetizacao.bimestre2}</p>
                        <p>{aluno.mapaAlfabetizacao.bimestre3}</p>
                        <p>{aluno.mapaAlfabetizacao.bimestre4}</p>
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
                    {filtros.includes("LEITURA") && <p>LEITURA</p>}
                    {filtros.includes("ESCRITA") && <p>ESCRITA</p>}
                    {filtros.includes("MATEMÁTICA") && <p>MATEMÁTICA</p>}
                </div>
                {dados.map((aluno) => (
                    <div key={aluno.ra} className="conteudo-topicos">
                        {filtros.includes("LEITURA") && <p>{aluno.diagnosticos[tipoDiagnostico].leitura}</p>}
                        {filtros.includes("ESCRITA") && <p>{aluno.diagnosticos[tipoDiagnostico].escrita}</p>}
                        {filtros.includes("MATEMÁTICA") && <p>{aluno.diagnosticos[tipoDiagnostico].matematica}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableStudents;
