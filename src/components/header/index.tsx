import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../service/auth-context";

const Header: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="../nextlogo.png"
            alt="Logo da Empresa"
            style={{ height: 150, width: 180 }}
          />
        </Typography>
        <Button color="inherit" onClick={handleLogout} sx={{ marginRight: 7 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
