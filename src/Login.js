import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Button, TextField, Typography, Grid, Container } from '@mui/material';

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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {isLogin ? "Entrar" : "Registrar"}
      </Typography>
      
      <TextField
        type="email"
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="email"
        required
      />
      
      <TextField
        type="password"
        label="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        required
      />
      
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAuth} 
            fullWidth
          >
            {isLogin ? "Entrar" : "Registrar"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => setIsLogin(!isLogin)} 
            fullWidth
          >
            {isLogin ? "Criar uma conta" : "Voltar para login"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
