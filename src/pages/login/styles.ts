import styled from "@emotion/styled";
import { Container, TextField } from "@mui/material";

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  height: auto;
  padding: 20px;
  background-color: white;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const CustomTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: white;
  }
  .MuiInputBase-input {
    color: green;
  }
  .MuiInputLabel-root {
    color: green;
  }
`;
