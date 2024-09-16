
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logout from "../componentes/login/Logout";
import { useEffect } from "react";

export default function Layout({ usuario, setUsuario }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário não está logado e redireciona para a página de login
    if (!usuario.id) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {usuario.id ? (
        <div >
          <Logout usuario={usuario} setUsuario={setUsuario} />
        </div>
      ) : (
        <div className="flex justify-center p-4">
          <Link to="/login"></Link>
          
        </div>
      )}

      {usuario.id && (
        <div>
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Principal
                      </Link>
                      <Link
                        to="/fornecedores"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Fornecedores
                      </Link>
                      <Link
                        to="/contatos"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Contatos
                      </Link>
                      <Link
                        to="/produtos"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Produtos
                      </Link>
                      <Link
                        to="/categoria"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Categoria Produto
                      </Link>
                      <Link
                        to="/cotacoes"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Requisições
                      </Link>
                      
                      <Link
                        to="/gestao"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Gestão
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
      <Outlet />
    </div>
  );
}

