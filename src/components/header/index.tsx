import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../service/auth-context";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  logoSrc: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const showExtraButton = location.pathname !== "/";

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src={logoSrc}
            alt="Logo da Empresa"
            style={{ height: 150, width: 180 }}
          />
        </Typography>
        {showExtraButton && (
          <Button
            color="inherit"
            sx={{ marginRight: 7 }}
            component={Link}
            to="/"
          >
            Perfis
          </Button>
        )}
        <Button color="inherit" onClick={handleLogout} sx={{ marginRight: 7 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
