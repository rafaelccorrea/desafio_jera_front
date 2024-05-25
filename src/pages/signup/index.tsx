import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Email, Lock, ArrowBack } from "@mui/icons-material";

import api from "../../service/api";
import {
  SignupContainer,
  SignupForm,
  CustomTextField,
  BackButtonContainer,
} from "./styles";

interface SignupError {
  response?: {
    status: number;
  };
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/users/create", {
        email,
        password,
        name,
        birthDate,
      });
      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      const signupError = error as SignupError;
      if (signupError.response && signupError.response.status === 409) {
        setErrorMessage("Um usuário com este email já está cadastrado.");
      } else {
        setErrorMessage(
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <SignupContainer>
      <BackButtonContainer>
        <IconButton color="success" onClick={handleBackToLogin}>
          <ArrowBack />
        </IconButton>
      </BackButtonContainer>
      <Typography variant="h4" gutterBottom color="textPrimary">
        Cadastro
      </Typography>
      <SignupForm onSubmit={handleSignup}>
        <CustomTextField
          label="Nome"
          type="text"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomTextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ startAdornment: <Email /> }}
        />
        <CustomTextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ startAdornment: <Lock /> }}
        />
        <CustomTextField
          label="Data de Nascimento"
          type="date"
          variant="outlined"
          fullWidth
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          disabled={loading}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Cadastrar
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
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
