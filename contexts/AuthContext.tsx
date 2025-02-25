"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "@/utils/api";

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  loginWithNobleblocks: (status_code: string) => Promise<void>;
  logout: () => void;
  setUserData: (userData: any) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    // Check localStorage during initialization
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Add useEffect to handle hydration
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setUserData = (userData: any) => {
    setUser(userData);
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login_with_email`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        const userData = {
          email,
          detail: { ...response.data.user },
          token: response.data.token.token,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token.token}`;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const loginWithNobleblocks = async (state_code: string) => {
    try {
      //auth/loign_with_nobleblocks
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/loign_with_nobleblocks?state=${state_code}`
      );

      if (response.data.token) {
        const userData = {
          email: "",
          detail: { ...response.data.user },
          token: response.data.token.token,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token.token}`;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithNobleblocks,
        logout,
        setUserData,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
