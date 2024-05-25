import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { setItem } from "../utils/local-storage";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const loginApi = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: username,
      password,
    });

    const { accessToken } = response.data;

    const decoded = jwtDecode(accessToken);

    setItem("userAuth", JSON.stringify(decoded));

    return true;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    const isAuthenticated = await loginApi(username, password);
    if (isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
