// RotaPrivada.jsx
import { Navigate } from 'react-router-dom';
import { verificarPermissaoAdmin } from '../infra/verificarPermissoes';

const RotaPrivada = ({ children, usuario }) => {
  if (!verificarPermissaoAdmin(usuario)) {
    alert('Apenas administradores acessam essa página.');
    return <Navigate to="/" />;
  }
  return children;
};

export default RotaPrivada;