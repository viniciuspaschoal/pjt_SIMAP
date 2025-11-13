import api from "./api";

export const getAlunoByRa = (ra) => api.get(`/aluno/ra/${ra}`)

export const aplicarFiltros = (filtrosSelecionados) => {
  console.log("➡️ Enviando filtros para backend:", filtrosSelecionados);
  return api.post('/aluno/filtro', filtrosSelecionados);
}