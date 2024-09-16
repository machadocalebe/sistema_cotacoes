import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { auth, db } from "../infra/firebase";
import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';

// Funções de autenticação
export async function logarUsuario(email, senha) {
    let retorno = {};
    try {
        // Faz login no Firebase Authentication
        const credenciais = await signInWithEmailAndPassword(auth, email, senha);
        const user = credenciais.user;

        // Busca as informações adicionais do usuário no Firestore
        const usuarioDoc = await getDoc(doc(db, 'usuarios', user.uid));

        if (usuarioDoc.exists()) {
            const dadosUsuario = usuarioDoc.data();

            // Verifica o status do usuário (bloqueado ou liberado)
            if (dadosUsuario.status === 'Bloqueado') {
                retorno.erro = "Sua conta está bloqueada. Entre em contato com o administrador.";
            } else {
                // Preenche os dados de retorno com o UID e as informações do Firestore
                retorno = {
                    id: user.uid,
                    email: user.email,
                    role: dadosUsuario.role, // Colaborador ou Administrador
                    status: dadosUsuario.status, // Liberado ou Bloqueado
                };
            }
        } else {
            retorno.erro = "Usuário não encontrado no Firestore.";
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        retorno.erro = "Login Inválido";
    }

    return retorno;
}

export async function deslogarUsuario() {
    await signOut(auth);
    return { id: "", email: "", senha: "" };
}

// Função para criar uma nova conta no Firebase Authentication e Firestore
export async function criarConta(email, senha, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Cria o documento do usuário na coleção 'usuarios' com o UID como ID do documento
        await setDoc(doc(db, "usuarios", user.uid), {
            email: user.email,
            uid: user.uid, // O ID único do usuário
            role, // 'Colaborador' ou 'Administrador'
            status: 'Liberado', // Status padrão
            createdAt: new Date() // Adiciona a data de criação
        });

        return user; // Retorna o usuário criado
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        throw error; // Lança o erro para tratamento posterior
    }
}

// Funções de manipulação de dados no Firestore
export async function atualizarUsuario(email, dados) {
    try {
        const docRef = doc(db, 'usuarios', email);
        await setDoc(docRef, dados, { merge: true }); // 'merge: true' para atualizar campos sem sobrescrever todo o documento
        return { sucesso: true };
    } catch (e) {
        return { erro: e.message };
    }
}

export async function deletarUsuario(email) {
    try {
        await deleteDoc(doc(db, 'usuarios', email));
        return { sucesso: true };
    } catch (e) {
        return { erro: e.message };
    }
}

// Função para listar usuários do Firestore
export async function listarUsuarios() {
    try {
        const q = collection(db, 'usuarios');
        const querySnapshot = await getDocs(q);
        let usuarios = [];
        querySnapshot.forEach((doc) => {
            usuarios.push({ id: doc.id, ...doc.data() });
        });
        return usuarios;
    } catch (e) {
        console.log(`Erro ao listar usuários: ${e.message}`);
        return []; // Retorna um array vazio em caso de erro
    }
}
