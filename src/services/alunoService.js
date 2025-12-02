import api from "./api";

// Busca completa por RA
export const getAlunoByRa = (ra) => api.get(`/aluno/ra/${ra}`);

// Envia os filtros 
export const aplicarFiltros = (filtrosSelecionados) => {
  return api.post('/aluno/filtro', filtrosSelecionados);
}

// --- Busca dinâmica para o Autocomplete ---
export const buscarAlunos = (termo) => {
  return api.get(`/aluno/buscar?termo=${termo}`);
}