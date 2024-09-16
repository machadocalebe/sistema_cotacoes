import { useState, useEffect } from 'react';
import { adicionarCategoria, obterCategorias, deletarCategoria, atualizarCategoria } from '../infra/categoriaProduto';
import { verificarPermissaoAdmin } from '../infra/verificarPermissoes';

export default function Categoria({ usuario }) {
  const [nome, setNome] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para controle de edição

  // Carrega as categorias ao montar o componente
  useEffect(() => {
    const carregarCategorias = async () => {
      const categoriasDoFirestore = await obterCategorias();
      setCategorias(categoriasDoFirestore);
    };
    carregarCategorias();
  }, []);

  const validarFormulario = () => {
    return nome.trim() !== ''; // Verifica se o campo Nome não está vazio
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novaCategoria = { nome };

    try {
      if (editando) {
        // Atualizar categoria existente
        await atualizarCategoria(editando, novaCategoria);
        setCategorias(categorias.map(c =>
          c.id === editando ? { id: editando, ...novaCategoria } : c
        ));
      } else {
        // Adicionar nova categoria
        const id = await adicionarCategoria(novaCategoria);
        if (id) {
          setCategorias([...categorias, { id, ...novaCategoria }]);
        }
      }

      // Limpar formulário e estado de edição
      setNome('');
      setEditando(null);
    } catch (e) {
      console.error("Erro ao adicionar ou atualizar categoria: ", e);
    }
  };

  const handleEdit = (categoria) => {
    setNome(categoria.nome);
    setEditando(categoria.id);
  };

  const handleDelete = async (id) => {
    await deletarCategoria(id);
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  return (
    <div className="categoriaContainer p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{editando ? 'Editar Categoria' : 'Cadastrar Categoria'}</h2>
  
      {/* Verifica se o usuário é administrador para exibir o formulário */}
      {verificarPermissaoAdmin(usuario) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md border-t-4 border-purple-400 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editando ? 'Atualizar' : 'Salvar'}
            </button>
            {editando && (
              <button
                type="button"
                onClick={() => {
                  setNome('');
                  setEditando(null);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}
  
      <h3 className="text-xl font-bold mt-6">Lista de Categorias</h3>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nome</th>
            {verificarPermissaoAdmin(usuario) && <th className="px-4 py-2">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{categoria.nome}</td>
              {verificarPermissaoAdmin(usuario) && (
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(categoria)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
