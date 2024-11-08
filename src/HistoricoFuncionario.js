import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './HistoricoFuncionario.css';

function HistoricoFuncionario() {
  const { funcionarioId } = useParams();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        console.log("ID do funcionário recebido:", funcionarioId);

        if (funcionarioId) {
          const historicoRef = collection(db, 'historico');
          const q = query(historicoRef, where('funcionarioId', '==', funcionarioId));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log("Nenhum documento encontrado para o funcionário:", funcionarioId);
          } else {
            const historicoData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Dados de historico:", historicoData);
            setHistorico(historicoData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    };

    fetchHistorico();
  }, [funcionarioId]);

  return (
    <div className="historico-container">
      <h2>Histórico do Funcionário</h2>
      {historico.length === 0 ? (
        <p>Não há histórico de alterações para este funcionário.</p>
      ) : (
        <ul>
          {historico.map((registro) => (
            <li key={registro.id}>
              <p><strong>Data e Hora da ultima atualização:</strong> {registro.dataHora ? new Date(registro.dataHora.seconds * 1000).toLocaleString() : "Data não disponível"}</p>
              <div className="dados-container">
                <div>
                  <p><strong>Dados Antigos:</strong></p>
                  <ul>
                    {Object.keys(registro.dadosAntigos || {}).map((key) => (
                      <li key={key} className={registro.dadosAntigos[key] !== registro.dadosNovos[key] ? 'campo-alterado' : ''}>
                        <strong>{key}:</strong> {registro.dadosAntigos[key] || "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p><strong>Dados Novos:</strong></p>
                  <ul>
                    {Object.keys(registro.dadosAntigos || {}).map((key) => (
                      <li key={key} className={registro.dadosAntigos[key] !== registro.dadosNovos[key] ? 'campo-alterado' : ''}>
                        <strong>{key}:</strong> {registro.dadosNovos[key] || "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoricoFuncionario;
