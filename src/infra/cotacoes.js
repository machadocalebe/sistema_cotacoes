
/*
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Função para adicionar uma cotação ao Firestore
export const adicionarCotacao = async (cotacao) => {
  try {
    const docRef = await addDoc(collection(db, "cotas"), cotacao);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar cotação: ", e);
  }
};

// Função para obter todas as cotações do Firestore
export const obterCotações = async () => {
  const cotacoes = [];
  try {
    const querySnapshot = await getDocs(collection(db, "cotas"));
    querySnapshot.forEach((doc) => {
      cotacoes.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Erro ao buscar cotações: ", e);
  }
  return cotacoes;
};

// Função para deletar uma cotação do Firestore
export const deletarCotacao = async (id) => {
  try {
    await deleteDoc(doc(db, "cotas", id));
  } catch (e) {
    console.error("Erro ao deletar cotação: ", e);
  }
};

// Função para contar cotações para um produto específico
export const contarCotaçõesPorProduto = async (produtoId) => {
  try {
    // Referência à coleção de cotações
    const cotaçõesRef = collection(db, "cotas");

    // Consulta para obter cotações com o produtoId especificado
    const q = query(cotaçõesRef, where("produtoId", "==", produtoId));

    // Obtendo os documentos
    const querySnapshot = await getDocs(q);

    // Contando o número de documentos encontrados
    return querySnapshot.size;
  } catch (e) {
    console.error("Erro ao contar cotações por produto: ", e);
    return 0;
  }
};

*/




import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";

// Função para adicionar uma cotação dentro da subcoleção de uma requisição
export const adicionarCotacao = async (idRequisicao, cotacao) => {
    try {
        // Acessando a subcoleção "cotações" dentro da requisição pelo ID
        const requisicaoRef = doc(db, "requisicoes", idRequisicao);
        const cotacaoRef = await addDoc(collection(requisicaoRef, "cotações"), cotacao);
        return cotacaoRef.id;
    } catch (e) {
        console.error("Erro ao adicionar cotação: ", e);
    }
};

// Função para deletar uma cotação dentro da subcoleção de uma requisição
export const deletarCotacao = async (idRequisicao, idCotacao) => {
  try {
      // Acessando o documento da cotação dentro da subcoleção "cotações" da requisição
      const cotacaoRef = doc(db, "requisicoes", idRequisicao, "cotações", idCotacao);
      
      // Deletando o documento da cotação
      await deleteDoc(cotacaoRef);
      console.log("Cotação deletada com sucesso");
  } catch (e) {
      console.error("Erro ao deletar cotação: ", e);
  }
};


// Função para obter todas as cotações de uma requisição específica
export const obterCotacoesPorRequisicao = async (idRequisicao) => {
    try {
        const requisicaoRef = doc(db, "requisicoes", idRequisicao); // obter a referência ao documento
        const cotacoesRef = collection(requisicaoRef, "cotações"); // acessar a subcoleção usando a referência do documento
        const cotacoesSnapshot = await getDocs(cotacoesRef);
        const cotacoes = cotacoesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return cotacoes;
    } catch (e) {
        console.error("Erro ao obter cotações: ", e);
    }
};





    
