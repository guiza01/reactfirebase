import React, { useState, useRef } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
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
  const steps = 3;
  const folhaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 2) {
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

  const progressPercentage = ((step + 1) / steps) * 100;

  const exportPDF = () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(folhaRef.current, {
      callback: () => {
        pdf.save('CadastroFuncionario.pdf');
      },
    });
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="form-section">
          <h3>Cadastro de Funcionário</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }} />
          </div>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <>
                <h3>Informações Pessoais</h3>
                <div>
                  <label>Nome</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="ex. Fernando" required />
                </div>
                <div>
                  <label>Sobrenome</label>
                  <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} placeholder="ex. Souza" required />
                </div>
                <div>
                  <label>Foto de Perfil</label>
                  <input type="text" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} placeholder="URL da Foto" />
                </div>
                <div>
                  <label>CPF</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="ex. 123.456.789-00" required />
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
                <div className="button-container">
                  <button type="button" onClick={nextStep} style={{ float: 'right' }}>Próximo</button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3>Dados de Admissão</h3>
                <div>
                  <label>Data de Admissão</label>
                  <input type="date" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required />
                </div>
                <div>
                  <label>Cargo</label>
                  <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="ex. Vendedor" required />
                </div>
                <div>
                  <label>Setor</label>
                  <input type="text" name="setor" value={formData.setor} onChange={handleChange} placeholder="ex. Atendimento" required />
                </div>
                <div>
                  <label>Nacionalidade</label>
                  <input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} placeholder="ex. Brasileiro" required />
                </div>
                <div>
                  <label>Endereço</label>
                  <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="ex. Avenida Paulista, 1234" required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex. tiago.souza@email.com" required />
                </div>
                <div>
                  <label>Telefone</label>
                  <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="ex. (11) 91234-5678" required />
                </div>
                <div>
                  <label>Salário</label>
                  <input type="number" name="salario" value={formData.salario} onChange={handleChange} placeholder="ex. 2500" required />
                </div>
                <div className="button-container">
                  <button type="button" onClick={prevStep} style={{ float: 'left' }}>Anterior</button>
                  <button type="button" onClick={nextStep} style={{ float: 'right' }}>Próximo</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Informações Adicionais</h3>
                <div>
                  <label>Educação</label>
                  <input type="text" name="educacao" value={formData.educacao} onChange={handleChange} placeholder="ex. Merchandising de Moda" required />
                </div>
                <div>
                  <label>Experiência</label>
                  <input type="text" name="experiencia" value={formData.experiencia} onChange={handleChange} placeholder="ex. Vendedor na Louis Vuitton" required />
                </div>
                <div>
                  <label>Habilidades</label>
                  <input type="text" name="habilidades" value={formData.habilidades} onChange={handleChange} placeholder="ex. Atendimento ao Cliente" required />
                </div>
                <div>
                  <label>Idiomas</label>
                  <input type="text" name="idiomas" value={formData.idiomas} onChange={handleChange} placeholder="ex. Francês Avançado" required />
                </div>
                <div>
                  <label>Resumo Pessoal</label>
                  <textarea name="resumoPessoal" value={formData.resumoPessoal} onChange={handleChange} placeholder="Descreva seu perfil e realizações" required />
                </div>
                <div className="button-container">
                  <button type="button" onClick={prevStep} style={{ float: 'left' }}>Anterior</button>
                  <button type="submit" style={{ float: 'right' }}>Finalizar</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroFuncionario;
