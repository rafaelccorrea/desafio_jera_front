import React from "react";
import AuthenticatedRoutes from "./auth-routes";
import PublicRoutes from "./public-routes";

const AppRoutes: React.FC = () => {
  const authenticated = true;
  return authenticated ? <PublicRoutes /> : <AuthenticatedRoutes />;
};

export default AppRoutes;
