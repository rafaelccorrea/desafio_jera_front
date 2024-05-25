import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../service/auth-context";
import { LoginContainer, LoginForm, CustomTextField } from "./styles";

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
  const { login } = useAuth();
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
    } catch (error) {
      setLoading(false);
      const authError = error as AuthError;
      if (authError.response && authError.response.status === 401) {
        setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        setErrorMessage(
          "Ocorreu um erro inesperado. Tente novamente mais tarde."
        );
      }
    }
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
          InputProps={{ startAdornment: <Email /> }}
        />
        <CustomTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ startAdornment: <Lock /> }}
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
        {errorMessage && (
          <Typography
            color="error"
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" style={{ marginTop: "10px" }}>
            Não tem uma conta?{" "}
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
