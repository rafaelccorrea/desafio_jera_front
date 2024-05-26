import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../service/auth-context";
import { Link, useLocation, useParams } from "react-router-dom";

interface HeaderProps {
  logoSrc: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const { id, name } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const showExtraButton = location.pathname !== "/";

  const drawerContent = (
    <List>
      {showExtraButton && (
        <>
          <ListItem button component={Link} to={`/meus/filmes/${id}/${name}`}>
            <ListItemText primary="Meus Filmes" />
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Perfis" />
          </ListItem>
        </>
      )}
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={logoSrc}
              alt="Logo da Empresa"
              style={{ height: 50, width: 60 }}
            />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {showExtraButton && (
              <>
                <Button
                  color="inherit"
                  sx={{ marginRight: 2 }}
                  component={Link}
                  to={`/meus/filmes/${id}/${name}`}
                >
                  Meus Filmes
                </Button>
                <Button
                  color="inherit"
                  sx={{ marginRight: 2 }}
                  component={Link}
                  to="/"
                >
                  Perfis
                </Button>
              </>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ marginRight: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
