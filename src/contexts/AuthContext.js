import { useMemo } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useDashboard } from "./DashboardContext";
import { getLocalStorageItem, setLocalStorageItems } from "../utils/index.";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);
  const { setCurrentSchool } = useDashboard();

  const getCurrentUser = useMemo(async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      if (refreshUser) {
        const userObjects = await getLocalStorageItem("users", null, "browser");
        const usr = userObjects?.filter((usrObj) => {
          return usrObj?.email === "guest.user@test.me";
        });
        setUser(usr[0]);
        setLocalStorageItems("user", usr[0]);
      } else {
        const userItem = JSON.parse(localStorage.getItem("user"));
        setUser(userItem);
      }
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
    setRefreshUser(false);
  }, [refreshUser]);

  const logout = () => {
    setUser(null);
    setCurrentSchool(null);
    localStorage.clear();
  };

  useEffect(() => {
    //getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: user, setUser, logout, setRefreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
