import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import styled from "@emotion/styled";

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
  return (
    <LoginContainer>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <LoginForm>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
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
          InputProps={{
            startAdornment: <Lock />,
          }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
