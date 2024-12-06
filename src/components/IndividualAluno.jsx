import './individualAluno.css';

function AlunoDetalhes({ aluno, onVoltar }) {
    return (
        <div className="container-user">

            {/* Informações Gerais do Aluno */}
            <div className="userHeader">
                    {/* Botão para voltar */}
                <button onClick={onVoltar} className="voltar-button">
                    <p>Voltar</p>
                    <i class="fa-solid fa-rotate-left"></i>
                </button>

                <div className="user-page">
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="userDetails">
                    <h1 className="userName">{aluno.nome}</h1>
                    <div className="userInfos">
                        <p>RA: <span>{aluno.ra}</span></p>
                        <p>Nascimento: <span>{aluno.dataNascimento}</span></p>
                        <p>Ano Letivo: <span>{aluno.anoLetivo || "2024"}</span></p>
                    </div>
                    <div className="userAttributes">
                        <div className="userSchool">
                            <p>{aluno.escola}</p>
                            <p>{aluno.serie} - {aluno.turma}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapa de Alfabetização */}
            <h2>MAPA DE ALFABETIZAÇÃO - HIPÓTESE DE ESCRITA</h2>
            <table>
                <thead>
                    <tr>
                        <th>1º BIMESTRE</th>
                        <th>2º BIMESTRE</th>
                        <th>3º BIMESTRE</th>
                        <th>4º BIMESTRE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{aluno.mapaAlfabetizacao.bimestre1 || '-'}</td>
                        <td>{aluno.mapaAlfabetizacao.bimestre2 || '-'}</td>
                        <td>{aluno.mapaAlfabetizacao.bimestre3 || '-'}</td>
                        <td>{aluno.mapaAlfabetizacao.bimestre4 || '-'}</td>
                    </tr>
                </tbody>
            </table>

            {/* Diagnósticos Iniciais */}
            <h2>DIAGNÓSTICOS INICIAIS - NÍVEIS DE PROFICIÊNCIA</h2>
            <table>
                <thead>
                    <tr>
                        <th>LEITURA</th>
                        <th>ESCRITA</th>
                        <th>MATEMÁTICA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{aluno.diagnosticos.inicial.leitura || '-'}</td>
                        <td>{aluno.diagnosticos.inicial.escrita || '-'}</td>
                        <td>{aluno.diagnosticos.inicial.matematica || '-'}</td>
                    </tr>
                </tbody>
            </table>

            {/* Diagnósticos Medial */}
            <h2>DIAGNÓSTICOS MEDIAL - NÍVEIS DE PROFICIÊNCIA</h2>
            <table>
                <thead>
                    <tr>
                        <th>LEITURA</th>
                        <th>ESCRITA</th>
                        <th>MATEMÁTICA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{aluno.diagnosticos.medial.leitura || '-'}</td>
                        <td>{aluno.diagnosticos.medial.escrita || '-'}</td>
                        <td>{aluno.diagnosticos.medial.matematica || '-'}</td>
                    </tr>
                </tbody>
            </table>

            {/* Diagnósticos Final */}
            <h2>DIAGNÓSTICOS FINAL - NÍVEIS DE PROFICIÊNCIA</h2>
            <table>
                <thead>
                    <tr>
                        <th>LEITURA</th>
                        <th>ESCRITA</th>
                        <th>MATEMÁTICA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{aluno.diagnosticos.final.leitura || '-'}</td>
                        <td>{aluno.diagnosticos.final.escrita || '-'}</td>
                        <td>{aluno.diagnosticos.final.matematica || '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AlunoDetalhes;

