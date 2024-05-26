import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setItem } from "../../utils/local-storage";

const FacebookCallbackHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`################################`)
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("accessToken");
    if (token) {
      setItem("accessToken", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Processando...</div>;
};

export default FacebookCallbackHandler;
