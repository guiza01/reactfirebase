import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Para estilizar a Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Cadastrar usuario</Link>
        </li>
        <li>
          <Link to="/sobre">Listar funcionarios</Link>
        </li>
        <li>
          <Link to="/sobre">Listar funcionarios demitidos</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </nav>
  );
};

export default Navbar;
