import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useParams } from 'react-router-dom';

function HistoricoFuncionario() {
  const { id: funcionarioId } = useParams();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      const docRef = doc(db, 'funcionario', funcionarioId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHistorico(docSnap.data().historico || []);
      }
    };
    fetchHistorico();
  }, [funcionarioId]);

  return (
    <div>
      <h2>Histórico do Funcionário</h2>
      <ul>
        {historico.map((registro, index) => (
          <li key={index}>
            {registro.atualizadoEm.toDate().toLocaleString()} - {registro.cargo} - {registro.salario}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoricoFuncionario;
