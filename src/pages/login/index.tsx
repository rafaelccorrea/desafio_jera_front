import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress, Box, InputAdornment } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../service/auth-context";
import { LoginContainer, LoginForm, CustomTextField } from "./styles";
import FacebookIcon from '@mui/icons-material/Facebook'; // Importando o ícone do Facebook

interface AuthError {
  response?: {
    status: number;
  };
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Removendo loginWithFacebook
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      const authError = error as AuthError;
      if (authError.response && authError.response.status === 401) {
        setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  const handleLoginWithFacebook = () => {
    window.location.href = 'https://desafio-jera.vercel.app/auth/facebook';
  };

  const handleNavigateToSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <LoginContainer>
      <Typography variant="h4" gutterBottom color="black">
        Login
      </Typography>
      <LoginForm onSubmit={handleLogin}>
        <CustomTextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
        />
        <CustomTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment> }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          disabled={loading}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Logar
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLoginWithFacebook}
          startIcon={<FacebookIcon />}
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          Login com Facebook
        </Button>
        {errorMessage && (
          <Typography
            color="error"
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <Typography variant="body2">
            Não tem uma conta?
          </Typography>
          <Button
            color="success"
            onClick={handleNavigateToSignup}
            style={{ textTransform: "none" }}
          >
            Cadastre-se
          </Button>
        </Box>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
