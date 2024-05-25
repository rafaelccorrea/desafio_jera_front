import React from "react";
import AuthenticatedRoutes from "./auth-routes";
import PublicRoutes from "./public-routes";
import { useAuth } from "../service/auth-context";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <PublicRoutes /> : <AuthenticatedRoutes />;
};

export default AppRoutes;
