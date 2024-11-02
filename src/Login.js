import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError(''); 
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/funcionarios');
    } catch (error) {
      setError(error.message); 
      console.error("Erro de autenticação:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Entrar" : "Registrar"}</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="E-mail" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Senha" 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAuth}>{isLogin ? "Entrar" : "Registrar"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Criar uma conta" : "Voltar para login"}
      </button>
    </div>
  );
}

export default Login;
