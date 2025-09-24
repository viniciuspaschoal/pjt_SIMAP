import './individualAluno.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dados from '../db/db.json'; // ajuste o caminho conforme seu projeto
import api from '../services/api';

function AlunoDetalhes({ onVoltar }) {
  const { ra } = useParams();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        //Requisição get para buscar o aluno pelo RA
        const response = await api.get(`/aluno/ra/${ra}`); 

        console.log(response.data); //Loga os dados recebidos
        setAluno(response.data); //Seta o aluno com os dados recebidos
      } catch(err) {
        setError('Erro ao buscar dados do aluno.'); //Seta a mensagem de erro
      } finally {
        setLoading(false); //Finaliza o loading
      }
    }

    fetchAluno(); //Chama a função de busca
  }, [ra]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!aluno) return <p>Aluno não encontrado.</p>;


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
            <h1 className="userName">{aluno.nomeAluno}</h1>
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
            <td>{aluno.mapaAlfabetizacao.inicial || '-'}</td>
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
            <td>{aluno.diagnosticos.primeiroBimestre.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.primeiroBimestre.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.primeiroBimestre.projeto || '-'}</td>
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
            <td>{aluno.diagnosticos.segundoBimestre.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.segundoBimestre.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.segundoBimestre.projeto || '-'}</td>
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
            <td>{aluno.diagnosticos.terceiroBimestre.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.terceiroBimestre.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.terceiroBimestre.projeto || '-'}</td>
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
            <td>{aluno.diagnosticos.quartoBimestre.alfabetizacao || '-'}</td>
            <td>{aluno.diagnosticos.quartoBimestre.frequencia || '-'}</td>
            <td>{aluno.diagnosticos.quartoBimestre.projeto || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AlunoDetalhes;