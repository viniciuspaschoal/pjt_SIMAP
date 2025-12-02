import api from "./api";

export const listarUsuarios = () =>
    api.get("/admin/usuarios");

export const listarPendentes = () =>
    api.get("/admin/usuarios/pendentes");

export const ativarUsuario = (id) =>
    api.patch(`/admin/usuarios/${id}/ativar`);

export const desativarUsuario = (id) =>
    api.patch(`/admin/usuarios/${id}/desativar`);

export const alterarCargo = (id, cargo) =>
    api.patch(`/admin/usuarios/${id}/role?novoCargo=${cargo}`);
