import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Função para adicionar uma Requisição ao Firestore com base na role do usuário
export const adicionarRequisicao = async (requisicao, usuario) => {
  try {
    if (!usuario || !usuario.role) {
      throw new Error("Usuário inválido ou sem role");
    }

    // Associa a requisição ao 'role' do usuário
    const requisicaoComRole = { ...requisicao, role: usuario.role };
    const docRef = await addDoc(collection(db, "requisicoes"), requisicaoComRole);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar requisição: ", e.message);
  }
};

// Função para obter todas as requisições do Firestore com base no tipo de usuário
export const obterRequisicoes = async (usuario) => {
  const requisicoes = [];
  try {
    const querySnapshot = await getDocs(collection(db, "requisicoes"));
    querySnapshot.forEach((doc) => {
      const requisicao = { id: doc.id, ...doc.data() };

      // Se o usuário for um colaborador, filtra as requisições de acordo com o role
      if (usuario.role === 'Colaborador' && requisicao.role !== 'Colaborador') {
        return; // Ignora requisições que não são para colaboradores
      }

      requisicoes.push(requisicao);
    });
  } catch (e) {
    console.error("Erro ao buscar requisições: ", e);
  }
  return requisicoes;
};

// Função para deletar uma requisição do Firestore
export const deletarRequisicao = async (id) => {
  try {
    await deleteDoc(doc(db, "requisicoes", id));
  } catch (e) {
    console.error("Erro ao deletar requisição: ", e);
  }
};
