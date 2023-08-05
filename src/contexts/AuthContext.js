import { useMemo } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCurrentUser = useMemo(async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      const userItem = JSON.parse(localStorage.getItem("user"));
      setUser(userItem);
    } else {
      try {
        const res = await fetch(`${BACKEND_HOST}/auth/`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    //getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
