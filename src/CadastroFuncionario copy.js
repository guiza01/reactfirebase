import React, { useState, useRef } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import './CadastroFuncionario.css';

function CadastroFuncionario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    demitido: false,
    cargo: '',
    cpf: '',
    dataAdmissao: '',
    dataNascimento: '',
    educacao: '',
    email: '',
    endereco: '',
    experiencia: '',
    fotoPerfil: null, // Alterado para null para armazenar o arquivo
    habilidades: '',
    idiomas: '',
    nacionalidade: '',
    nome: '',
    resumoPessoal: '',
    salario: '',
    setor: '',
    sexo: '',
    sobrenome: '',
    telefone: '',
  });

  const [step, setStep] = useState(0);
  const totalSteps = 3;
  const folhaRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Armazena o arquivo selecionado
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === totalSteps - 1) {
      try {
        const funcionarioRef = await addDoc(collection(db, 'funcionario'), formData);
        const historicoData = {
          funcionarioId: funcionarioRef.id,
          dadosNovos: formData,
          dadosAntigos: null,
          dataHora: new Date(),
        };
        await addDoc(collection(db, 'historico'), historicoData);

        alert('Funcionário cadastrado com sucesso!');
        setFormData({
          demitido: false,
          cargo: '',
          cpf: '',
          dataAdmissao: '',
          dataNascimento: '',
          educacao: '',
          email: '',
          endereco: '',
          experiencia: '',
          fotoPerfil: null, // Resetando para null
          habilidades: '',
          idiomas: '',
          nacionalidade: '',
          nome: '',
          resumoPessoal: '',
          salario: '',
          setor: '',
          sexo: '',
          sobrenome: '',
          telefone: '',
        });
        setStep(0);
        navigate('/funcionarios');
      } catch (error) {
        alert('Erro ao cadastrar funcionário: ' + error.message);
      }
    }
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const exportPDF = () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(folhaRef.current, {
      callback: () => {
        pdf.save('CadastroFuncionario.pdf');
      },
    });
  };

  const stepTitles = ['Informações Pessoais', 'Dados de Admissão', 'Informações Adicionais'];

  return (
    <div className="container">
      <header className="header">
        <img src="../logoTaugor.png" alt="Logo da Empresa" className="logoTaugor" />

        <div className="steps-container">
          <span className="steps-counter">Passo {step + 1} de {totalSteps}</span>
          <h4>{stepTitles[step]}</h4>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          style={{ marginRight: 'auto' }}
        ></Button>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} ref={folhaRef}>
          {step === 0 && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Nome</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Sobrenome</label>
              </div>
              <div className="input-group">
                <input
                  type="file" // Campo para enviar arquivo
                  name="fotoPerfil"
                  onChange={handleChange}
                  className="input-field"
                />
                <label className="input-label">Foto do perfil</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="cpf"
                  maxLength="11"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">CPF</label>
              </div>
              <div className="input-group">
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <label className="input-label">Sexo</label>
              </div>
              <div className="input-group">
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Data de Nascimento</label>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="input-group">
                <input
                  type="date"
                  name="dataAdmissao"
                  value={formData.dataAdmissao}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Data de Admissão</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Cargo</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="setor"
                  value={formData.setor}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Setor</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="nacionalidade"
                  value={formData.nacionalidade}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Nacionalidade</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Endereço</label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Email</label>
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Telefone</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Salário</label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="educacao"
                  value={formData.educacao}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Educação</label>
              </div>
              <div className="input-group">
                <textarea
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Experiência</label>
              </div>
              <div className="input-group">
                <textarea
                  name="habilidades"
                  value={formData.habilidades}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Habilidades</label>
              </div>
              <div className="input-group">
                <textarea
                  name="idiomas"
                  value={formData.idiomas}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Idiomas</label>
              </div>
              <div className="input-group">
                <textarea
                  name="resumoPessoal"
                  value={formData.resumoPessoal}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Resumo Pessoal</label>
              </div>
            </>
          )}

          <div className="button-group">
            {step > 0 && <button type="button" onClick={prevStep}>Anterior</button>}
            {step < totalSteps - 1 ? (
              <button type="button" onClick={nextStep}>Próximo</button>
            ) : (
              <button type="submit">Cadastrar Funcionário</button>
            )}
            <button type="button" onClick={exportPDF}>Exportar PDF</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroFuncionario;