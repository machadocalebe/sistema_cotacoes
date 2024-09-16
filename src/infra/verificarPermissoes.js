export const verificarPermissaoAdmin = (usuario) => {
    return usuario.role === 'Administrador';
};

export const verificarPermissaoColaborador = (usuario) => {
    return usuario.role === 'Colaborador';
};
