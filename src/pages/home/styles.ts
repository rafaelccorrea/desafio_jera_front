import styled from "styled-components";
import { Container } from "@mui/material";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
`;

export const ProfileCard = styled.div`
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  margin-top: 100px;

  &:hover {
    transform: translateY(-5px);
  }

  & > * {
    margin-bottom: 10px;
  }
`;
