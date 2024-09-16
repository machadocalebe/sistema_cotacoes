import { useState, useEffect } from 'react';
import { listarUsuarios, atualizarUsuario, deletarUsuario } from '../infra/usuarios';
import Modal from 'react-modal';

export default function Gestao() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Colaborador');
    const [status, setStatus] = useState('Liberado');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        async function fetchUsuarios() {
            const data = await listarUsuarios();
            setUsuarios(data);
        }
        fetchUsuarios();
    }, []);

    const handleOpenModal = (usuario) => {
        setEditId(usuario ? usuario.id : null);
        setEmail(usuario ? usuario.email : '');
        setRole(usuario ? usuario.role : 'Colaborador');
        setStatus(usuario ? usuario.status : 'Liberado');
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async () => {
        if (editId) {
            await atualizarUsuario(editId, { email, role, status });
        }
        setModalIsOpen(false);
        const data = await listarUsuarios();
        setUsuarios(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            await deletarUsuario(id);
            const data = await listarUsuarios();
            setUsuarios(data);
        }
    };

    return (
        <div className="gestaoContainer p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      
          {/* Tabela de Usuários */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Acesso</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{usuario.email}</td>
                  <td className="border px-4 py-2">{usuario.role}</td>
                  <td className="border px-4 py-2">{usuario.status}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleOpenModal(usuario)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 ml-2">
                      Editar
                    </button>
                    {usuario.email !== 'admin@infnet.com' && (
                      <button onClick={() => handleDelete(usuario.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">
                        Excluir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
          {/* Modal de Adição/Edição de Usuário */}
          <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
            <div className="popup-inner bg-white p-6 rounded-lg shadow-lg max-w-lg">
              <h2 className="text-xl font-bold mb-4">{editId ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
              <form className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
      
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Cargo:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Colaborador">Colaborador</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
      
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Liberado">Liberado</option>
                    <option value="Bloqueado">Bloqueado</option>
                  </select>
                </div>
      
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {editId ? 'Atualizar' : 'Adicionar'}
                  </button>
                  <button type="button" onClick={handleCloseModal} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      );
      
}
