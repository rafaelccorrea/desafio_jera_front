import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Componente para lidar com o redirecionamento de volta do Facebook
const FacebookCallbackHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifique se a URL possui o token de acesso
    console.log(`################################`)
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("accessToken");
    if (token) {
      // Armazene o token no localStorage
      localStorage.setItem("accessToken", token);
      // Redirecione para a página principal
      navigate("/");
    } else {
      // Em caso de falha, redirecione para a página de login
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Processando...</div>;
};

export default FacebookCallbackHandler;
