import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MovieList from "../pages/movies";

const AuthenticatedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filmes/:id/:name" element={<MovieList />} />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
};

export default AuthenticatedRoutes;
