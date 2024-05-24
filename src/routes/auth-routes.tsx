import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";

const AuthenticatedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
};

export default AuthenticatedRoutes;
