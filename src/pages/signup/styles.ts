import { Container, TextField } from "@mui/material";
import styled from "styled-components";

export const SignupContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  background-color: white;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 8px;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
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

export const BackButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;
