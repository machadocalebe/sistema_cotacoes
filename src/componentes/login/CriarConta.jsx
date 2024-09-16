import { Link, useNavigate } from "react-router-dom";
import { criarConta } from "../../infra/usuarios";

/*
export default function CriarConta({ setUsuario }) {
  async function handleClick(event) {
    const email = document.getElementById("novoEmail").value;
    const senha = document.getElementById("novaSenha").value;
    const confirma = document.getElementById("confirma").value;
    if (senha === confirma) {
      let usuario = await criarConta(email, senha);
      if (usuario.id) {
        alert(`Conta Criada com Sucesso`);
        setUsuario(usuario);
      } else {
        alert(usuario.erro);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Nova Conta
        </h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="novoEmail" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input type="text" id="novoEmail" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="novaSenha" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
            <input type="password" id="novaSenha" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="confirma" className="block text-sm font-medium leading-6 text-gray-900">Confirmação</label>
            <input type="password" id="confirma" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Criar Conta
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem login?
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Efetue o Login aqui!</Link>
        </p>
      </div>
    </div>
  );
}
*/

/*mudei aqui if (senha === confirma) {
      let usuario = await criarConta(email, senha, 'Colaborador');
      if (usuario && usuario.uid) {
        alert(`Conta Criada com Sucesso`);
        setUsuario(usuario);
        navigate("/");
      } else {
        alert(usuario.erro);
      }
    } else {
      alert("As senhas não coincidem");
    }
    */
export default function CriarConta({ setUsuario }) {

  const navigate = useNavigate();

  async function handleClick(event) {
    const email = document.getElementById("novoEmail").value;
    const senha = document.getElementById("novaSenha").value;
    const confirma = document.getElementById("confirma").value;
    if (senha === confirma) {
      try {
        // Adicionando 'role' como 'Colaborador' e 'status' como 'Liberado'
        let usuario = await criarConta(email, senha, 'Colaborador');
        if (usuario && usuario.uid) {
          alert(`Conta Criada com Sucesso`);
          setUsuario(usuario);
          navigate("/");
        } else {
          alert("Erro ao criar conta. Verifique o console para mais detalhes.");
        }
      } catch (error) {
        console.error("Erro ao criar conta:", error);
        alert("Erro ao criar conta. Verifique o console para mais detalhes.");
      }
    } else {
      alert("As senhas não coincidem");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Nova Conta
        </h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="novoEmail" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input type="text" id="novoEmail" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="novaSenha" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
            <input type="password" id="novaSenha" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="confirma" className="block text-sm font-medium leading-6 text-gray-900">Confirmação</label>
            <input type="password" id="confirma" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Criar Conta
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem login?
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Efetue o Login aqui!</Link>
        </p>
      </div>
    </div>
  );
}