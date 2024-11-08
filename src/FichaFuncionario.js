import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            const funcionariosRef = collection(db, 'funcionario');
            const snapshot = await getDocs(funcionariosRef);
            const funcionariosData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFuncionarios(funcionariosData);
        };

        fetchFuncionarios();
    }, []);

    const gerarPDF = (funcionario) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text(`Ficha do Funcionário: ${funcionario.nome} ${funcionario.sobrenome}`, 10, 10);

        let yPos = 20;

        doc.setFontSize(14);
        doc.text("1° Informações Pessoais", 10, yPos);
        doc.setFontSize(12);
        yPos += 10;

        const infoPessoais = [
            `Nome: ${funcionario.nome}`,
            `Sobrenome: ${funcionario.sobrenome}`,
            `Sexo: ${funcionario.sexo || "Não especificado"}`,
            `Nacionalidade: ${funcionario.nacionalidade || "Não especificado"}`,
            `Data de Nascimento: ${funcionario.dataNascimento || "Não especificado"}`,
            `CPF: ${funcionario.cpf || "Não especificado"}`,
            `Telefone: ${funcionario.telefone || "Não especificado"}`,
            `Email: ${funcionario.email || "Não especificado"}`,
            `Endereço: ${funcionario.endereco || "Não especificado"}`,
            `Foto de Perfil: ${funcionario.fotoPerfil ? "Disponível" : "Não disponível"}`
        ];

        infoPessoais.forEach(info => {
            doc.text(info, 10, yPos);
            yPos += 10;
        });

        yPos += 10; 
        doc.setFontSize(14);
        doc.text("2° Informações Adicionais", 10, yPos);
        doc.setFontSize(12);
        yPos += 10;

        const infoAdicionais = [
            `Data de Admissão: ${funcionario.dataAdmissao || "Não especificado"}`,
            `Cargo: ${funcionario.cargo || "Não especificado"}`,
            `Setor: ${funcionario.setor || "Não especificado"}`,
            `Salário: R$ ${funcionario.salario || "Não especificado"}`,
            `Educação: ${funcionario.educacao || "Não especificado"}`,
            `Experiência: ${funcionario.experiencia || "Não especificado"}`,
            `Habilidades: ${funcionario.habilidades || "Não especificado"}`,
            `Idiomas: ${funcionario.idiomas || "Não especificado"}`,
            `Resumo Pessoal: ${funcionario.resumoPessoal || "Não especificado"}`
        ];

        infoAdicionais.forEach(info => {
            doc.text(info, 10, yPos);
            yPos += 10;
        });

        doc.save(`Ficha_${funcionario.nome}_${funcionario.sobrenome}.pdf`);
    };

    return (
        <div className="container mt-4">
            <h2>Ficha dos Funcionários</h2>
            {funcionarios.length === 0 ? (
                <p>Carregando lista de funcionários...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Baixar Ficha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.sobrenome}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2 align-items-center" 
                                    onClick={() => gerarPDF(funcionario)}>
                                        <DownloadIcon fontSize="small" className="me-1" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListaFuncionarios;
