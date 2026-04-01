import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_URL = "https://realworld.habsida.net/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      localStorage.setItem("token", data.user.token);
      return data.user;
    } else {
      throw data.errors;
    }
  };

  const registerUser = async (username, email, password) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { username, email, password } }),
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      localStorage.setItem("token", data.user.token);
      return data.user;
    } else {
      throw data.errors;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Одно объявление value со всеми функциями
  const value = { 
    user, 
    isLoading, 
    isAuthenticated: !!user, 
    login, 
    logout, 
    registerUser 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
