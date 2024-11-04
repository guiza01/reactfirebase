import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { db, auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Login from './Login';
import CadastroFuncionario from './CadastroFuncionario';
import ListarFuncionario from './ListarFuncionario';
import AtualizarFuncionario from './AtualizarFuncionario';
import HistoricoFuncionario from './HistoricoFuncionario';
import FichaFuncionario from './FichaFuncionario';

function Navbar() {
  const location = useLocation();
  const logoUrl = "/logoTaugor.png";
  const [usuario] = useAuthState(auth);

  // Exibe a navbar apenas se não estivermos na rota de cadastro
  if (location.pathname === '/funcionarios/cadastrar') return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logoUrl} alt="logo da empresa" style={{ width: '150px', height: '65px', marginRight: '10px' }} />
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {usuario && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/funcionarios">Funcionários</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/funcionarios/cadastrar">Cadastrar Funcionário</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/funcionarios/fichas">Fichas dos funcionários</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={() => auth.signOut()}>
              {usuario ? 'Sair' : 'Entrar'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  const [usuario] = useAuthState(auth);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={usuario ? <Navigate to="/funcionarios" /> : <Navigate to="/login" />} />
          <Route path="/funcionarios" element={usuario ? <ListarFuncionario /> : <Navigate to="/login" />} />
          <Route path="/funcionarios/cadastrar" element={usuario ? <CadastroFuncionario /> : <Navigate to="/login" />} />
          <Route path="/funcionarios/atualizar/:funcionarioId" element={usuario ? <AtualizarFuncionario /> : <Navigate to="/login" />} />
          <Route path="/funcionarios/historico/:funcionarioId" element={usuario ? <HistoricoFuncionario /> : <Navigate to="/login" />} />
          <Route path="/funcionarios/fichas/" element={usuario ? <FichaFuncionario /> : <Navigate to="/login" />} />
          <Route path="/funcionarios/fichas/:funcionarioId" element={usuario ? <FichaFuncionario /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
