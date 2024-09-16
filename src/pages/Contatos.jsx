import { useState, useEffect } from 'react';
import { adicionarContato, obterContatos, deletarContato, atualizarContato } from '../infra/contato';
import { obterFornecedores } from '../infra/fornecedor';
import { regexEmail, regexNumerico } from '../infra/Regex';
import { verificarPermissaoAdmin } from '../infra/verificarPermissoes';

export default function Contatos({ usuario }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para controle de edição
  const [erros, setErros] = useState({});

  // Carrega os contatos e fornecedores ao montar o componente
  useEffect(() => {
    const carregarDados = async () => {
      const contatosDoFirestore = await obterContatos();
      const fornecedoresDoFirestore = await obterFornecedores();
      setContatos(contatosDoFirestore);
      setFornecedores(fornecedoresDoFirestore);
    };
    carregarDados();
  }, []);

  const validarFormulario = () => {
    const novosErros = {};
    if (!regexEmail.test(email)) novosErros.email = 'Email inválido';
    if (!regexNumerico.test(telefone)) novosErros.telefone = 'Telefone inválido';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novoContato = { nome, email, telefone, cargo, fornecedor };

    try {
      if (editando) {
        // Atualizar contato existente
        await atualizarContato(editando, novoContato);
        setContatos(contatos.map((contato) =>
          contato.id === editando ? { id: editando, ...novoContato } : contato
        ));
      } else {
        // Adicionar novo contato
        const id = await adicionarContato(novoContato);
        if (id) {
          setContatos([...contatos, { id, ...novoContato }]);
        }
      }

      // Limpar formulário e estado de edição
      setNome('');
      setEmail('');
      setTelefone('');
      setCargo('');
      setFornecedor('');
      setEditando(null);
    } catch (e) {
      console.error("Erro ao adicionar ou atualizar contato: ", e);
    }
  };

  const handleEdit = (contato) => {
    setNome(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.telefone);
    setCargo(contato.cargo);
    setFornecedor(contato.fornecedor);
    setEditando(contato.id);
  };

  const handleDelete = async (id) => {
    await deletarContato(id);
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  return (
    <div className='contatoContainer p-4 bg-gray-50 min-h-screen flex flex-col items-center'>
      <h2 className="text-2xl font-bold mb-4">{editando ? 'Editar Contato' : 'Cadastrar Contato'}</h2>
  
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
            <label className="block text-sm font-medium text-gray-700">Cargo:</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Fornecedor:</label>
            <select
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {fornecedores.map((forne) => (
                <option key={forne.id} value={forne.nome}>
                  {forne.nome}
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
                  setEmail('');
                  setTelefone('');
                  setCargo('');
                  setFornecedor('');
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
  
      <h3 className="text-xl font-bold mt-6">Lista de Contatos</h3>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Cargo</th>
            <th className="px-4 py-2">Fornecedor</th>
            {verificarPermissaoAdmin(usuario) && <th className="px-4 py-2">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {contatos.map((contato) => (
            <tr key={contato.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{contato.nome}</td>
              <td className="border px-4 py-2">{contato.email}</td>
              <td className="border px-4 py-2">{contato.telefone}</td>
              <td className="border px-4 py-2">{contato.cargo}</td>
              <td className="border px-4 py-2">{contato.fornecedor}</td>
              {verificarPermissaoAdmin(usuario) && (
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(contato)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(contato.id)}
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
