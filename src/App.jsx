import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Gestao from './pages/Gestao';
import Fornecedores from './pages/Fornecedores';
import Contatos from './pages/Contatos';
import Produtos from './pages/Produtos';
import Categoria from './pages/Categoria';
import Cotacoes from './pages/Cotacoes';
import Login from './componentes/login/Login';
import CriarConta from './componentes/login/CriarConta';
import { useState } from 'react';
import RotaPrivada from './rotaPrivada/RotaPrivada';

export default function App() {
  
  const [usuario, setUsuario] = useState({ id: "", email: "", senha: "", role: "" });

  

  //adicionei usuario={usuario} no fornecedores.
  return (
    <Router>
      <Routes>

        {/* Rotas fora do layout */}
        <Route path="/login" element={<Login usuario={usuario} setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<CriarConta setUsuario={setUsuario} />} />
        
        {/* Rotas dentro do layout */}
        <Route path="/" element={<Layout usuario={usuario} setUsuario={setUsuario} />}>
          <Route index element={<Home />} />
          <Route path="gestao" element={<RotaPrivada usuario={usuario}><Gestao /></RotaPrivada>} />
          <Route path="contatos" element={<Contatos usuario={usuario}/>} />
          <Route path="fornecedores" element={<Fornecedores usuario={usuario}/>} /> 
          <Route path="cotacoes" element={<Cotacoes usuario={usuario}/>} />
          <Route path="produtos" element={<Produtos usuario={usuario}/>} />
          <Route path="categoria" element={<Categoria usuario={usuario}/>} /> 
        </Route>
      </Routes>
    </Router>
  );
}
