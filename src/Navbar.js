import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Para estilizar a Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cadastro-funcionario">Cadastrar funcionario</Link>
        </li>
        <li>
          <Link to="/funcionarios">Funcionarios</Link>
        </li>
        <li>
          <Link to="/sobre">Funcionarios demitidos</Link>
        </li>
        <li>
          <Link to="/contato">Ficha do funcionario</Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </nav>
  );
};

export default Navbar;
