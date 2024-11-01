import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.css';
import './App.css';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cargo, setCargo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const fotoPerfilRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nome:", nome);
    console.log("Sobrenome:", sobrenome);
    console.log("Email:", email);
    // Você pode adicionar lógica para navegar para a próxima etapa aqui
  };

  const handleFotoPerfilChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleAddClick = () => {
    if (fotoPerfilRef.current) {
      fotoPerfilRef.current.click();
    }
  };

  const handleNextClick = () => {
    console.log("Próximo clicado");
  };

  return (
    
    <div className="container">
      <h2>Fale-nos um pouco sobre você</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <div className="form-group">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                />
                <span className="example-text">ex: João</span>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  placeholder="Sobrenome"
                />
                <span className="example-text">ex: Silva</span>
              </div>
            </div>

            <div className="form-group foto-perfil">
              <input
                type="file"
                id="fotoPerfil"
                ref={fotoPerfilRef}
                onChange={handleFotoPerfilChange}
                accept="image/*"
                className="foto-input"
                style={{ display: 'none' }}
              />
              <label htmlFor="fotoPerfil" className="foto-label">
                {fotoPerfil ? (
                  <img
                    src={URL.createObjectURL(fotoPerfil)}
                    alt="Foto de perfil"
                    className="foto-preview"
                  />
                ) : (
                  <div className="foto-esboco">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="foto-icon"
                    >
                      <path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10" />
                      <path d="M7 19l5-5 5 5V5h2" />
                    </svg>
                  </div>
                )}
              </label>

              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab size="small" color="secondary" aria-label="add" onClick={handleAddClick}>
                  <AddIcon />
                </Fab>
              </Box>
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Emprego"
            />
            <span className="example-text">ex: Desenvolvedor</span>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço"
            />
            <span className="example-text">ex: Rua das Flores, 123</span>
          </div>

          <div className="form-row">
            <div className="form-column">
              <div className="form-group">
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Telefone"
                />
                <span className="example-text">ex: (11) 91234-5678</span>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  value={nacionalidade}
                  onChange={(e) => setNacionalidade(e.target.value)}
                  placeholder="Nacionalidade"
                />
                <span className="example-text">ex: Brasileiro</span>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                />
                <span className="example-text">ex: jeferson@email.com</span>
              </div>

              <div className="form-group">
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  placeholder="Data de nascimento"
                />
                <span className="example-text">ex: 01/01/2000</span>
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={() => console.log("Anterior clicado")}>Anterior</button>
            <button type="button" onClick={handleNextClick}>Próximo</button>
          </div>
        </form>

        {/* Div para exibir os dados digitados */}
        <div className="preview-container">
          <h3>Conteúdo Digitado</h3>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>Sobrenome:</strong> {sobrenome}</p>
          <p><strong>Cargo:</strong> {cargo}</p>
          <p><strong>Endereço:</strong> {endereco}</p>
          <p><strong>Telefone:</strong> {telefone}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Nacionalidade:</strong> {nacionalidade}</p>
          <p><strong>Data de Nascimento:</strong> {dataNascimento}</p>
          {fotoPerfil && (
            <div>
              <strong>Foto de Perfil:</strong>
              <img
                src={URL.createObjectURL(fotoPerfil)}
                alt="Foto de perfil"
                className="foto-preview"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }} // ajuste o estilo conforme necessário
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
