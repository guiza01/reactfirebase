import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';

function ListarFuncionario() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const buscarFuncionarios = async () => {
      const querySnapshot = await getDocs(collection(db, "funcionario"));
      setFuncionarios(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    buscarFuncionarios();
  }, []);

  const funcionariosAtivos = funcionarios.filter(funcionario => !funcionario.demitido);

  return (
    <div>
      <h2>Todos os funcionários</h2>
      <ul>
        {funcionariosAtivos.map((funcionario) => (
          <li key={funcionario.id}>
            {funcionario.nome} - {funcionario.cargo}
            <Link to={`/funcionarios/atualizar/${funcionario.id}`}> Atualizar</Link> |{' '}
            <Link to={`/funcionarios/historico/${funcionario.id}`}> Histórico</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarFuncionario;
