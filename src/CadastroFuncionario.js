import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function CadastroFuncionario() {
  const [formData, setFormData] = useState({
    demitido: false,
    cargo: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'funcionario'), formData);
      alert('Funcionário cadastrado com sucesso!');
      setFormData({
        cargo: '',
        dataAdmissao: '',
        dataNascimento: '',
        demitido: false,
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
    } catch (error) {
      alert('Erro ao cadastrar funcionário: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Cadastrar Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Demitido:</label>
          <input type="checkbox" name="demitido" checked={formData.demitido} onChange={(e) => setFormData({ ...formData, demitido: e.target.checked })} />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>Sobrenome:</label>
          <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
        </div>
        <div>
          <label>Sexo:</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
        </div>
        <div>
          <label>Data de Admissão:</label>
          <input type="date" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} required />
        </div>
        <div>
          <label>Cargo:</label>
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </div>
        <div>
          <label>Setor:</label>
          <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
        </div>
        <div>
          <label>Nacionalidade:</label>
          <input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} required />
        </div>
        <div>
          <label>Endereço:</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div>
          <label>Salário:</label>
          <input type="number" name="salario" value={formData.salario} onChange={handleChange} required />
        </div>
        <div>
          <label>Foto de Perfil (URL):</label>
          <input type="text" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} />
        </div>
        <div>
          <label>Educação:</label>
          <input type="text" name="educacao" value={formData.educacao} onChange={handleChange} />
        </div>
        <div>
          <label>Experiência:</label>
          <input type="text" name="experiencia" value={formData.experiencia} onChange={handleChange} />
        </div>
        <div>
          <label>Habilidades:</label>
          <input type="text" name="habilidades" value={formData.habilidades} onChange={handleChange} />
        </div>
        <div>
          <label>Idiomas:</label>
          <input type="text" name="idiomas" value={formData.idiomas} onChange={handleChange} />
        </div>
        <div>
          <label>Resumo Pessoal:</label>
          <textarea name="resumoPessoal" value={formData.resumoPessoal} onChange={handleChange} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
