import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import FacebookCallbackHandler from "../pages/login/facebook";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/facebook/ok" element={<FacebookCallbackHandler />} />

      <Route element={<Navigate replace to="/auth/login" />} path="*" />
    </Routes>
  );
};

export default PublicRoutes;
