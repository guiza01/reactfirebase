import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'; // Ícone de edição
import HistoryIcon from '@mui/icons-material/History'; // Ícone de histórico

function ListarFuncionario() {
  const navigate = useNavigate();
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
    <div className="container mt-4">
      <h2>Todos os funcionários</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionariosAtivos.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>
                <div className="d-inline-flex">
                  <button
                    className="btn btn-primary btn-sm me-2 d-flex align-items-center"
                    onClick={() => navigate(`/funcionarios/atualizar/${funcionario.id}`)}
                  >
                    <EditIcon fontSize="small" className="me-1" /> Editar
                  </button>
                  <button
                    className="btn btn-secondary btn-sm d-flex align-items-center"
                    onClick={() => navigate(`/funcionarios/historico/${funcionario.id}`)}
                  >
                    <HistoryIcon fontSize="small" className="me-1" /> Histórico
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarFuncionario;