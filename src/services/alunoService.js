import api from "./api";

export const getAlunoByRa = (ra) => api.get(`/aluno/ra/${ra}`)