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
    fotoPerfil: '',
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          fotoPerfil: '',
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
      <header className="header" >
        <img src="../logoTaugor.png" alt="Logo da Empresa" className="logo" style={{ width: '150px', height: '65px', marginRight: '10px' }} />

        <div className="steps-container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
          <span className="steps-counter">Passo {step + 1} de {totalSteps}</span>
          <h4>{stepTitles[step]}</h4>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          style={{ marginRight: 'auto' }}
        >
          Home
        </Button>
      </header>

      <div className="main-content">
        <h3>Cadastro de Funcionário</h3>
        <form onSubmit={handleSubmit} ref={folhaRef}>
          {step === 0 && (
            <>
              <div>
                <label>Nome</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div>
                <label>Sobrenome</label>
                <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
              </div>
              <div>
                <label>Foto de Perfil</label>
                <input type="text" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} placeholder="URL da Foto" />
              </div>
              <div>
                <label>CPF</label>
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
              </div>
              <div>
                <label>Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label>Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label>Data de Admissão</label>
                <input type="date" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required />
              </div>
              <div>
                <label>Cargo</label>
                <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required />
              </div>
              <div>
                <label>Setor</label>
                <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
              </div>
              <div>
                <label>Nacionalidade</label>
                <input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} required />
              </div>
              <div>
                <label>Endereço</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label>Telefone</label>
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
              </div>
              <div>
                <label>Salário</label>
                <input type="number" name="salario" value={formData.salario} onChange={handleChange} required />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label>Educação</label>
                <input type="text" name="educacao" value={formData.educacao} onChange={handleChange} required />
              </div>
              <div>
                <label>Experiência</label>
                <input type="text" name="experiencia" value={formData.experiencia} onChange={handleChange} required />
              </div>
              <div>
                <label>Habilidades</label>
                <input type="text" name="habilidades" value={formData.habilidades} onChange={handleChange} required />
              </div>
              <div>
                <label>Idiomas</label>
                <input type="text" name="idiomas" value={formData.idiomas} onChange={handleChange} required />
              </div>
              <div>
                <label>Resumo Pessoal</label>
                <textarea name="resumoPessoal" value={formData.resumoPessoal} onChange={handleChange} required />
              </div>
            </>
          )}

          <div className="button-container">
            {step > 0 && <button type="button" onClick={prevStep}>Anterior</button>}
            {step < totalSteps - 1 ? (
              <button type="button" onClick={nextStep}>Próximo</button>
            ) : (
              <button type="submit">Finalizar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroFuncionario;
