//import { deslogarUsuario } from "../../infra/usuarios";
/*
export default function Logout({ usuario, setUsuario }) {

    async function handleClick(event) {
        let retorno = await deslogarUsuario()
        setUsuario(retorno);
    }

    return (
        <div className="flex justify-between items-center">
            Conta: <b>{usuario.email}</b>
            <input
                type="button"
                value="Logout"
                onClick={handleClick}
                className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2 cursor-pointer"
            />
        </div>
    );
}
*/

import { useNavigate } from "react-router-dom";

export default function Logout({ usuario, setUsuario }) {
  const navigate = useNavigate();

  function handleLogout() {
    setUsuario({ id: "", email: "", senha: "" });
    alert("Logout Efetuado");
    navigate("/login");  // Alterado para redirecionar para a página de login
  }

  return (
    <div className="flex justify-between bg-gray-700 p-4">
      <b className="flex justify-center items-center text-white">
        Nivel: {usuario.role}
      </b>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
