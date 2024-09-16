import { useState, useEffect } from 'react';
import { adicionarFornecedor, obterFornecedores, deletarFornecedor, atualizarFornecedor } from '../infra/fornecedor';
import { obterUfs } from '../infra/uf';
import { regexEmail, regexNumerico } from '../infra/Regex';
import { verificarPermissaoAdmin } from '../infra/verificarPermissoes';

export default function Fornecedores({ usuario }) {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [uf, setUF] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [ufList, setUfList] = useState([]);
  const [editando, setEditando] = useState(null);
  const [erros, setErros] = useState({});

  useEffect(() => {
    const carregarFornecedores = async () => {
      const fornecedoresDoFirestore = await obterFornecedores();
      setFornecedores(fornecedoresDoFirestore);
    };

    const carregarUfs = async () => {
      try {
        const ufs = await obterUfs();
        setUfList(ufs);
      } catch (error) {
        console.error("Erro ao carregar UFs: ", error.message);
      }
    };

    carregarFornecedores();
    carregarUfs();
  }, []);

  const validarFormulario = () => {
    const novosErros = {};
    if (!regexEmail.test(email)) novosErros.email = 'Email inválido';
    if (!regexNumerico.test(telefone)) novosErros.telefone = 'Telefone inválido';
    if (cnpj.length !== 14) novosErros.cnpj = 'CNPJ inválido, deve conter 14 números';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novoFornecedor = { nome, endereco, telefone, email, cnpj, uf };

    try {
      if (editando) {
        await atualizarFornecedor(editando, novoFornecedor);
        setFornecedores(fornecedores.map((fornecedor) =>
          fornecedor.id === editando ? { id: editando, ...novoFornecedor } : fornecedor
        ));
      } else {
        const id = await adicionarFornecedor(novoFornecedor);
        if (id) {
          setFornecedores([...fornecedores, { id, ...novoFornecedor }]);
        }
      }

      setNome('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setCNPJ('');
      setUF('');
      setEditando(null);
    } catch (e) {
      console.error("Erro ao adicionar ou atualizar fornecedor: ", e);
    }
  };

  const handleEdit = (fornecedor) => {
    setNome(fornecedor.nome);
    setEndereco(fornecedor.endereco);
    setTelefone(fornecedor.telefone);
    setEmail(fornecedor.email);
    setCNPJ(fornecedor.cnpj);
    setUF(fornecedor.uf);
    setEditando(fornecedor.id);
  };

  const handleDelete = async (id) => {
    await deletarFornecedor(id);
    setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
  };

  return (
    <div className='fornecedorContainer p-4 bg-gray-50 min-h-screen flex flex-col items-center'>
      <h2 className="text-2xl font-bold mb-4">{editando ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}</h2>

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
              className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Endereço:</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Telefone:</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className={`peer w-full border ${erros.telefone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 ${erros.telefone ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {erros.telefone && <span className="text-sm text-red-600">{erros.telefone}</span>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`peer w-full border ${erros.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 ${erros.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {erros.email && <span className="text-sm text-red-600">{erros.email}</span>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">CNPJ:</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCNPJ(e.target.value)}
              required
              className={`peer w-full border ${erros.cnpj ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 ${erros.cnpj ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {erros.cnpj && <span className="text-sm text-red-600">{erros.cnpj}</span>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">UF:</label>
            <select
              value={uf}
              onChange={(e) => setUF(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma UF</option>
              {ufList.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
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
                  setEndereco('');
                  setTelefone('');
                  setEmail('');
                  setCNPJ('');
                  setUF('');
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

      <h3 className="text-xl font-bold mt-6">Lista de Fornecedores</h3>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Endereço</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">CNPJ</th>
            <th className="px-4 py-2">UF</th>
            {verificarPermissaoAdmin(usuario) && <th className="px-4 py-2">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{fornecedor.nome}</td>
              <td className="border px-4 py-2">{fornecedor.endereco}</td>
              <td className="border px-4 py-2">{fornecedor.telefone}</td>
              <td className="border px-4 py-2">{fornecedor.email}</td>
              <td className="border px-4 py-2">{fornecedor.cnpj}</td>
              <td className="border px-4 py-2">{fornecedor.uf}</td>
              {verificarPermissaoAdmin(usuario) && (
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(fornecedor)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(fornecedor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
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
