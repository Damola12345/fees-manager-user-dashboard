import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
