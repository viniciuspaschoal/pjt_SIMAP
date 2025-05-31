import './individualAluno.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dados from '../db/db.json'; // ajuste o caminho conforme seu projeto

function AlunoDetalhes({ onVoltar }) {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    function buscarAlunoPorId(idAluno) {
      for (const escola in dados) {
        for (const serie in dados[escola]) {
          for (const turma in dados[escola][serie]) {
            const listaAlunos = dados[escola][serie][turma];
            const encontrado = listaAlunos.find(a => a.cod_aluno === Number(idAluno));
            if (encontrado) return encontrado;
          }
        }
      }
      return null;
    }

    const alunoEncontrado = buscarAlunoPorId(id);
    setAluno(alunoEncontrado);
  }, [id]);

  if (!aluno) return <p>Carregando ou aluno não encontrado...</p>;

  return (
    <div className="container-user">

      <div className='header-user'>
        <div>
          {/* Botão para voltar */}
          <button onClick={onVoltar} className="voltar-button">
            <p>Voltar</p>
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <div style={{ height: '15vh' }}></div>
        </div>

        <div className='info-user'>
          <div className="user-icon">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="userDetails">
            <div className="userAttributes">
              <div className="userSchool">
                <p>{aluno.escola}</p>
              </div>
            </div>
            <h1 className="userName">{aluno.nome}</h1>
            <div className="userAttributes">
              <div className="userSchool">
                <p>{aluno.serie + "º Ano"} - {aluno.turma} - {aluno.turno}</p>
              </div>
            </div>

            <div className="userInfos">
              <p>RA: <span>{aluno.ra}</span></p>
              <p>Nascimento: <span>{aluno.dataNascimento || "-"}</span></p>
              <p>Declaração: <span>{aluno.declaracao || "-"}</span></p>
              <p>Ano Letivo: <span>{aluno.anoLetivo || anoAtual}</span></p>
            </div>
          </div>
        </div>

      </div>

      {/* Hipótese Inicial */}
      <h2>HIPÓTESE INICIAL</h2>
      <table className='table-hipoteseInicial'>
        <thead>
          <tr>
            <th>HIPÓTESE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{'-'}</td>
          </tr>
        </tbody>
      </table>

      {/* MAPA 1º BIMESTRE */}
      <h2>MAPA 1º BIMESTRE</h2>
      <table className='individual-bimestres'>
        <thead>
          <tr>
            <th>ALFABETIZAÇÃO</th>
            <th>FREQUÊNCIA</th>
            <th>P.R.A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{aluno.diagnosticos.priBim.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.priBim.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.priBim.projeto || '-'}</td>
          </tr>
        </tbody>
      </table>

      {/* MAPA 2º BIMESTRE */}
      <h2>MAPA 2º BIMESTRE</h2>
      <table className='individual-bimestres'>
        <thead>
          <tr>
            <th>ALFABETIZAÇÃO</th>
            <th>FREQUÊNCIA</th>
            <th>P.R.A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{aluno.diagnosticos.segBim.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.segBim.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.segBim.projeto || '-'}</td>
          </tr>
        </tbody>
      </table>

      {/* MAPA 3º BIMESTRE */}
      <h2>MAPA 3º BIMESTRE</h2>
      <table className='individual-bimestres'>
        <thead>
          <tr>
            <th>ALFABETIZAÇÃO</th>
            <th>FREQUÊNCIA</th>
            <th>P.R.A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{aluno.diagnosticos.terBim.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.terBim.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.terBim.projeto || '-'}</td>
          </tr>
        </tbody>
      </table>

      {/* MAPA 4º BIMESTRE */}
      <h2>MAPA 4º BIMESTRE</h2>
      <table className='individual-bimestres'>
        <thead>
          <tr>
            <th>ALFABETIZAÇÃO</th>
            <th>FREQUÊNCIA</th>
            <th>P.R.A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{aluno.diagnosticos.quarBim.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.quarBim.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.quarBim.projeto || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AlunoDetalhes;