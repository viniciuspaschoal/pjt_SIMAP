import api from "./api";

// Função para obter projetos com filtros aplicados
export const aplicarFiltrosProjeto = async (filtrosSelecionados) => {
  console.log("➡️ Enviando filtros para backend (projeto):", filtrosSelecionados);
  return await api.post('/projeto-recomposicao/filtrar', filtrosSelecionados); // Rota para aplicar os filtros no backend
}
