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
      <div className="navbar">Navbar</div>

      <div className="main-content">
        <div className="form-section">
          <h2>Cadastro de Funcionário</h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }} />
          </div>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <>
                <h3>Informações Pessoais</h3>
                <div><label>Nome:</label><input type="text" name="nome" value={formData.nome} onChange={handleChange} required /></div>
                <div><label>Sobrenome:</label><input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required /></div>
                <div><label>Foto de Perfil:</label><input type="text" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} /></div>
                <div><label>CPF:</label><input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required /></div>
                <div><label>Sexo:</label>
                  <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div><label>Data de Nascimento:</label><input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required /></div>
                <button type="button" onClick={nextStep}>Próximo</button>
              </>
            )}

            {step === 1 && (
              <>
                <h3>Dados de Admissão</h3>
                <div><label>Data de Admissão:</label><input type="date" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required /></div>
                <div><label>Cargo:</label><input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required /></div>
                <div><label>Setor:</label><input type="text" name="setor" value={formData.setor} onChange={handleChange} required /></div>
                <div><label>Nacionalidade:</label><input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} required /></div>
                <div><label>Endereço:</label><input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required /></div>
                <div><label>Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                <div><label>Telefone:</label><input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required /></div>
                <div><label>Salário:</label><input type="number" name="salario" value={formData.salario} onChange={handleChange} required /></div>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="button" onClick={nextStep}>Próximo</button>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Informações Adicionais</h3>
                <div><label>Educação:</label><input type="text" name="educacao" value={formData.educacao} onChange={handleChange} required /></div>
                <div><label>Experiência:</label><input type="text" name="experiencia" value={formData.experiencia} onChange={handleChange} required /></div>
                <div><label>Habilidades:</label><input type="text" name="habilidades" value={formData.habilidades} onChange={handleChange} required /></div>
                <div><label>Idiomas:</label><input type="text" name="idiomas" value={formData.idiomas} onChange={handleChange} required /></div>
                <div><label>Resumo Pessoal:</label><textarea name="resumoPessoal" value={formData.resumoPessoal} onChange={handleChange} required /></div>
                <div><label>Demitido:</label><input type="checkbox" name="demitido" checked={formData.demitido} onChange={(e) => setFormData({ ...formData, demitido: e.target.checked })} /></div>
                <button type="button" onClick={prevStep}>Anterior</button>
                <button type="submit">Finalizar</button>
              </>
            )}
          </form>
        </div>

        <div className="preview-section" ref={folhaRef}>
          <h3>Pré-visualização (Folha A4)</h3>
          <div className="preview-content">
            <p><strong>Nome:</strong> {formData.nome} {formData.sobrenome}</p>
            <p><strong>CPF:</strong> {formData.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
            <p><strong>Foto de Perfil:</strong> {formData.fotoPerfil}</p>
            <p><strong>Sexo:</strong> {formData.sexo}</p>
            <p><strong>Data de Admissão:</strong> {formData.dataAdmissao}</p>
            <p><strong>Cargo:</strong> {formData.cargo}</p>
            <p><strong>Setor:</strong> {formData.setor}</p>
            <p><strong>Salário:</strong> {formData.salario}</p>
            <p><strong>Endereço:</strong> {formData.endereco}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Telefone:</strong> {formData.telefone}</p>
            <p><strong>Educação:</strong> {formData.educacao}</p>
            <p><strong>Experiência:</strong> {formData.experiencia}</p>
            <p><strong>Habilidades:</strong> {formData.habilidades}</p>
            <p><strong>Idiomas:</strong> {formData.idiomas}</p>
            <p><strong>Resumo Pessoal:</strong> {formData.resumoPessoal}</p>
            <p><strong>Demitido:</strong> {formData.demitido ? 'Sim' : 'Não'}</p>
          </div>
          <button onClick={exportPDF} style={{ marginTop: '15px' }}>Exportar PDF</button>
        </div>

      </div>
    </div >
  );
}

export default CadastroFuncionario;
