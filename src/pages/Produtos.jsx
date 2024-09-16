import { useState, useEffect } from 'react';
import { adicionarProduto, obterProdutos, deletarProduto, atualizarProduto } from '../infra/produto';
import { obterCategorias } from '../infra/categoriaProduto';
import { verificarPermissaoAdmin } from '../infra/verificarPermissoes';

export default function Produtos({ usuario }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para controle de edição
  const [erros, setErros] = useState({});

  // Carrega os produtos e categorias ao montar o componente
  useEffect(() => {
    const carregarDados = async () => {
      const produtosDoFirestore = await obterProdutos();
      const categoriasDoFirestore = await obterCategorias();
      setProdutos(produtosDoFirestore);
      setCategorias(categoriasDoFirestore);
    };
    carregarDados();
  }, []);

  const validarFormulario = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!descricao.trim()) novosErros.descricao = 'Descrição é obrigatória';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novoProduto = { nome, descricao, categoria };

    try {
      if (editando) {
        // Atualizar produto existente
        await atualizarProduto(editando, novoProduto);
        setProdutos(produtos.map((produto) =>
          produto.id === editando ? { id: editando, ...novoProduto } : produto
        ));
      } else {
        // Adicionar novo produto
        const id = await adicionarProduto(novoProduto);
        if (id) {
          setProdutos([...produtos, { id, ...novoProduto }]);
        }
      }

      // Limpar formulário e estado de edição
      setNome('');
      setDescricao('');
      setCategoria('');
      setEditando(null);
    } catch (e) {
      console.error("Erro ao adicionar ou atualizar produto: ", e);
    }
  };

  const handleEdit = (produto) => {
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setCategoria(produto.categoria);
    setEditando(produto.id);
  };

  const handleDelete = async (id) => {
    await deletarProduto(id);
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div className='produtoContainer p-4 bg-gray-50 min-h-screen flex flex-col items-center'>
      <h2 className="text-2xl font-bold mb-4">{editando ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
  
      {/* Verifica se o usuário é administrador para exibir o formulário */}
      {verificarPermissaoAdmin(usuario) && (
        <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-md shadow-md border-t-4 border-purple-400 sm:grid-cols-2 w-full max-w-3xl">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className={`peer w-full border ${erros.nome ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 ${erros.nome ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {erros.nome && <span className="text-sm text-red-600">{erros.nome}</span>}
          </div>
  
          <div className="relative sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className={`peer w-full border ${erros.descricao ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 ${erros.descricao ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {erros.descricao && <span className="text-sm text-red-600">{erros.descricao}</span>}
          </div>
  
          <div className="relative sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Categoria:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
  
          <div className="flex space-x-4 mt-4 sm:col-span-2">
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
                  setDescricao('');
                  setCategoria('');
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
  
      <h3 className="text-xl font-bold mt-6">Lista de Produtos</h3>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Categoria</th>
            {verificarPermissaoAdmin(usuario) && <th className="px-4 py-2">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{produto.nome}</td>
              <td className="border px-4 py-2">{produto.descricao}</td>
              <td className="border px-4 py-2">{produto.categoria}</td>
              {verificarPermissaoAdmin(usuario) && (
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(produto)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id)}
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
