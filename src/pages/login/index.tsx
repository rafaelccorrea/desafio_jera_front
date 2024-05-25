import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useAuth } from "../../service/auth-context";

const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <LoginContainer>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <LoginForm onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <Email />,
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <Lock />,
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
