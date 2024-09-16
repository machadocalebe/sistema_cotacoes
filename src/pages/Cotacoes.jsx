/*
import { useState, useEffect } from 'react';
import { adicionarCotacao, obterCotações, deletarCotacao } from '../infra/cotacoes';
import { obterFornecedores } from '../infra/fornecedor';
import { obterProdutos } from '../infra/produto';

export default function Cotacoes() {
  const [produtoId, setProdutoId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [cotacoes, setCotacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [filtroProduto, setFiltroProduto] = useState(''); // Novo estado para filtro
  const [erros, setErros] = useState({});

  // Carrega as cotações, produtos e fornecedores ao montar o componente
  useEffect(() => {
    const carregarDados = async () => {
      const cotacoesDoFirestore = await obterCotações();
      const produtosDoFirestore = await obterProdutos();
      const fornecedoresDoFirestore = await obterFornecedores();
      setCotacoes(cotacoesDoFirestore);
      setProdutos(produtosDoFirestore);
      setFornecedores(fornecedoresDoFirestore);
    };
    carregarDados();
  }, []);

  const validarFormulario = () => {
    const novosErros = {};
    if (!produtoId) novosErros.produto = 'Produto é obrigatório';
    if (!fornecedorId) novosErros.fornecedor = 'Fornecedor é obrigatório';
    if (!valor.trim() || isNaN(valor)) novosErros.valor = 'Valor é obrigatório e deve ser numérico';
    if (!data) novosErros.data = 'Data é obrigatória';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novaCotacao = { produtoId, fornecedorId, valor, data };
    const id = await adicionarCotacao(novaCotacao);

    if (id) {
      setCotacoes([...cotacoes, { id, ...novaCotacao }]);
      setProdutoId('');
      setFornecedorId('');
      setValor('');
      setData('');
    }
  };

  const handleDelete = async (id) => {
    await deletarCotacao(id);
    setCotacoes(cotacoes.filter((cotacao) => cotacao.id !== id));
  };

  // Filtra as cotações baseadas no filtro do produto
  const cotacoesFiltradas = filtroProduto
    ? cotacoes.filter(cotacao => cotacao.produtoId === filtroProduto)
    : cotacoes;

  return (
    <div className='cotacaoContainer'>
      <h2>Cotações</h2>

     <h3>Cadastrar Cotações</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Produto:</label>
          <select
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            style={{ borderColor: erros.produto ? 'red' : '' }}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          {erros.produto && <span style={{ color: 'red' }}>{erros.produto}</span>}
        </div>
        <div>
          <label>Fornecedor:</label>
          <select
            value={fornecedorId}
            onChange={(e) => setFornecedorId(e.target.value)}
            style={{ borderColor: erros.fornecedor ? 'red' : '' }}
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
          {erros.fornecedor && <span style={{ color: 'red' }}>{erros.fornecedor}</span>}
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            style={{ borderColor: erros.valor ? 'red' : '' }}
            required
          />
          {erros.valor && <span style={{ color: 'red' }}>{erros.valor}</span>}
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{ borderColor: erros.data ? 'red' : '' }}
            required
          />
          {erros.data && <span style={{ color: 'red' }}>{erros.data}</span>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>

      <h3>Lista de Cotações</h3>

        <div>
            <label>Procurar cotações por Produto:</label>
            <select
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
            >
              <option value="">Todos os Produtos</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>
        
      <table border="1">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Fornecedor</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cotacoesFiltradas.map((cotacao, index) => (
            <tr key={index}>
              <td>{produtos.find(p => p.id === cotacao.produtoId)?.nome || 'Desconhecido'}</td>
              <td>{fornecedores.find(f => f.id === cotacao.fornecedorId)?.nome || 'Desconhecido'}</td>
              <td>{cotacao.valor}</td>
              <td>{cotacao.data}</td>
              <td>
                <button
                  onClick={() => handleDelete(cotacao.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

*/

import { useState, useEffect } from 'react';
import { adicionarRequisicao, obterRequisicoes, deletarRequisicao } from '../infra/requisicao';
import { obterProdutos } from '../infra/produto';
import { adicionarCotacao, obterCotacoesPorRequisicao, deletarCotacao } from '../infra/cotacoes';
import { obterFornecedores } from '../infra/fornecedor';
import { verificarPermissaoAdmin, verificarPermissaoColaborador } from '../infra/verificarPermissoes';

export default function Cotacoes({ usuario }) {
  // Estado de Requisição
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [erros, setErros] = useState({});

  // Estados do pop-up de cotação
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [fornecedorId, setFornecedorId] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [idRequisicao, setIdRequisicao] = useState(''); // Novo estado para armazenar o ID da requisição

  // Estado do filtro
  const [filtroProdutoId, setFiltroProdutoId] = useState(''); // Filtro baseado no produto

  const [mostrarDetalhamento, setMostrarDetalhamento] = useState(false); // Adicionei estado para exibir ou esconder o detalhamento
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState(null); // Estado para armazenar a requisição selecionada


  // Carrega as requisições, produtos e fornecedores ao montar o componente
  useEffect(() => {
    const carregarDados = async () => {
      const requisicoesDoFirestore = await obterRequisicoes(usuario);
      const produtosDoFirestore = await obterProdutos();
      const fornecedoresDoFirestore = await obterFornecedores();

      // Obtenção das cotações para cada requisição
      const requisicoesComCotacoes = await Promise.all(
        requisicoesDoFirestore.map(async (requisicao) => {
          const cotacoes = await obterCotacoesPorRequisicao(requisicao.id) || []; //mudei aqui 
          return { ...requisicao, cotacoes }; // -----
        })
      );

      setRequisicoes(requisicoesComCotacoes);
      setProdutos(produtosDoFirestore);
      setFornecedores(fornecedoresDoFirestore);
    };
    carregarDados();
  }, [usuario]);

  // Validação básica
  const validarFormulario = () => {
    const novosErros = {};
    if (!quantidade || isNaN(quantidade)) novosErros.quantidade = 'Quantidade inválida';
    if (!validade) novosErros.validade = 'Validade é obrigatória';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const novaRequisicao = { produtoId, quantidade, validade, descricao, cotacoes: [] };
    const id = await adicionarRequisicao(novaRequisicao, usuario);

    if (id) {
      setRequisicoes([...requisicoes, { id, ...novaRequisicao, status: 'Não cotada', role: usuario.role }]);
      setProdutoId('');
      setQuantidade('');
      setValidade('');
      setDescricao('');
    }
  };

  const handleDelete = async (id) => {
    await deletarRequisicao(id);
    setRequisicoes(requisicoes.filter((requisicao) => requisicao.id !== id));
  };

  // Função para abrir o pop-up de cotações
  const abrirCotacao = (id) => {
    if (verificarPermissaoAdmin(usuario)) {
      setIdRequisicao(id);
      setMostrarPopup(true);
    } else {
      alert("Você não tem permissão para cotar");
    }
  };

  // Função para fechar o pop-up
  const fecharCotacao = () => {
    setMostrarPopup(false);
    setFornecedorId('');
    setValor('');
    setObservacao('');
  };

  // Função para salvar cotação
  const handleSalvarCotacao = async () => {
    if (!fornecedorId || !valor) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novaCotacao = { fornecedorId, valor, observacao };
    await adicionarCotacao(idRequisicao, novaCotacao);
    fecharCotacao();

    // Atualizar a lista de requisições após adicionar a cotação
    const cotacoes = await obterCotacoesPorRequisicao(idRequisicao) || [];
    const novoStatus = cotacoes.length >= 3 ? 'Cotada' : 'Em cotação';
    setRequisicoes(requisicoes.map(req =>
      req.id === idRequisicao ? { ...req, cotacoes, status: novoStatus } : req
    ));
  };

  // Função para deletar uma cotação
  const handleDeleteCotacao = async (idCotacao, idRequisicao) => {
    try {
      // Chama a função para deletar a cotação do banco de dados
      await deletarCotacao(idRequisicao, idCotacao);

      // Atualizar a lista de cotações da requisição após a remoção
      const cotacoesAtualizadas = await obterCotacoesPorRequisicao(idRequisicao) || [];
      const novoStatus = cotacoesAtualizadas.length >= 3 ? 'Cotada' : 'Em cotação';

      setRequisicoes(requisicoes.map(req =>
        req.id === idRequisicao ? { ...req, cotacoes: cotacoesAtualizadas, status: novoStatus } : req
      ));
    } catch (error) {
      console.error('Erro ao deletar a cotação:', error);
    }
  };

  // Filtro das requisições baseado no produto
  const requisicoesFiltradas = filtroProdutoId ? requisicoes.filter((req) => req.produtoId === filtroProdutoId) : requisicoes;

  const abrirDetalhamento = (requisicao) => {
    setRequisicaoSelecionada(requisicao);
    setMostrarDetalhamento(true);
  };

  const fecharDetalhamento = () => {
    setMostrarDetalhamento(false);
    setRequisicaoSelecionada(null);
  };

  // Função para exportar em CSV
  const exportarCSV = () => {
    if (!requisicaoSelecionada) return;

    const linhas = [
      ['Produto', 'Quantidade', 'Validade', 'Descrição', 'Status'],
      [
        produtos.find(p => p.id === requisicaoSelecionada.produtoId)?.nome || 'Desconhecido',
        requisicaoSelecionada.quantidade,
        requisicaoSelecionada.validade,
        requisicaoSelecionada.descricao,
        requisicaoSelecionada.status
      ],
      [],
      ['Fornecedor', 'Valor', 'Observação']
    ];

    requisicaoSelecionada?.cotacoes?.forEach(cotacao => {
      const fornecedor = fornecedores.find(f => f.id === cotacao.fornecedorId)?.nome || 'Desconhecido';
      linhas.push([fornecedor, cotacao.valor, cotacao.observacao]);
    });

    const csvContent = "data:text/csv;charset=utf-8,"
      + linhas.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "detalhamento_requisicao.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className='requisicaoContainer p-6 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-4'>Requisições</h2>
  
      {/* Formulário de requisição */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md border-t-4 border-purple-400 max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Produto:</label>
          <select
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um produto</option>
            {produtos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nome}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={{ borderColor: erros.quantidade ? 'red' : '' }}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {erros.quantidade && <span className="text-red-500">{erros.quantidade}</span>}
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Validade:</label>
          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {erros.validade && <span className="text-red-500">{erros.validade}</span>}
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
  
      {/* Filtro de requisições */}
      <h3 className="text-xl font-bold mt-6">Filtro de Requisições</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filtrar por Produto:</label>
        <select
          value={filtroProdutoId}
          onChange={(e) => setFiltroProdutoId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os Produtos</option>
          {produtos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nome}
            </option>
          ))}
        </select>
      </div>
  
      {/* Lista de requisições */}
      <h3 className="text-xl font-bold mt-6">Lista de Requisições</h3>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Produto</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Validade</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {requisicoesFiltradas.map((requisicao, index) => {
            const cotacoes = requisicao.cotacoes || [];
            let status = cotacoes.length === 0 ? "Não Cotada" : cotacoes.length < 3 ? "Em Cotação" : "Cotada";
  
            return (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{produtos.find(p => p.id === requisicao.produtoId)?.nome || 'Desconhecido'}</td>
                <td className="border px-4 py-2">{requisicao.quantidade}</td>
                <td className="border px-4 py-2">{requisicao.validade}</td>
                <td className="border px-4 py-2">{requisicao.descricao}</td>
                <td className="border px-4 py-2">{status}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => abrirDetalhamento(requisicao)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 ml-2">Detalhes</button>
                  <button onClick={() => handleDelete(requisicao.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">Deletar</button>
                  <button onClick={() => abrirCotacao(requisicao.id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2">Cotar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
  
      {/* Popup de detalhamento */}
      {mostrarDetalhamento && requisicaoSelecionada && (
        <div className="popup fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="popup-inner bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-bold mb-4">Detalhamento da Requisição</h3>
            <p><strong>Produto:</strong> {produtos.find((prod) => prod.id === requisicaoSelecionada.produtoId)?.nome}</p>
            <p><strong>Quantidade:</strong> {requisicaoSelecionada.quantidade}</p>
            <p><strong>Validade:</strong> {requisicaoSelecionada.validade}</p>
            <p><strong>Descrição:</strong> {requisicaoSelecionada.descricao}</p>
            <p><strong>Status:</strong> {requisicaoSelecionada?.cotacoes.length === 0 ? "Não Cotada" : requisicaoSelecionada?.cotacoes.length < 3 ? "Em Cotação" : "Cotada"}</p>
  
            <h4 className="text-lg font-bold mt-4">Cotações</h4>
            {requisicaoSelecionada.cotacoes && requisicaoSelecionada.cotacoes.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Fornecedor</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Observação</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {requisicaoSelecionada.cotacoes.map((cotacao, index) => {
                    const fornecedorNome = fornecedores.find((forn) => forn.id === cotacao.fornecedorId)?.nome || 'Desconhecido';
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{fornecedorNome}</td>
                        <td className="border px-4 py-2">{cotacao.valor}</td>
                        <td className="border px-4 py-2">{cotacao.observacao}</td>
                        <td className="border px-4 py-2">
                          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleDeleteCotacao(cotacao.id, requisicaoSelecionada.id)}>Deletar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Nenhuma cotação disponível</p>
            )}
  
            <div className="mt-4">
              <button onClick={fecharDetalhamento} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Fechar</button>
              <button onClick={exportarCSV} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">Exportar CSV</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Popup de cotação */}
      {mostrarPopup && (
        <div className="popup fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="popup-inner bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-bold mb-4">Nova Cotação</h3>
  
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fornecedor:</label>
              <select
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map((fornecedor) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Valor:</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Observação:</label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="flex justify-end space-x-2">
              <button onClick={handleSalvarCotacao} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar Cotação</button>
              <button onClick={fecharCotacao} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}
