import React, { createContext, useContext, useState } from "react";
import { getItem, removeItem, setItem } from "../utils/local-storage";
import { jwtDecode } from "jwt-decode";
import { User } from "./types";
import api from "./api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
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
    const response = await api.post("/auth/login", {
      email: username,
      password,
    });

    const { accessToken } = response.data;

    const decoded: User = jwtDecode(accessToken);
    setItem("userAuth", JSON.stringify(decoded));

    return decoded;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userFromStorage = getItem("userAuth");
  const initialUser: User | null = userFromStorage
    ? JSON.parse(userFromStorage)
    : null;
  const [user, setUser] = useState<User | null>(initialUser);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!getItem("userAuth")
  );

  const login = async (username: string, password: string) => {
    try {
      const user = await loginApi(username, password);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    removeItem("userAuth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
