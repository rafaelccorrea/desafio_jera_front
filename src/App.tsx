import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./global.css";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
