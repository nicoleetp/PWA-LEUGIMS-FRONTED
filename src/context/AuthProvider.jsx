import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token_sesion");

    if (storedToken) {
      setToken(storedToken);
      const decoded = jwt_decode(storedToken);
      setUser(decoded);
      setLoad(false);
    } else {
      setLoad(false);
      return;
    }
  }, []);

  const signIn = (token) => {
    setToken(token);
    localStorage.setItem("token_sesion", token);

    const decoded = jwt_decode(token);
    setUser(decoded);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token_sesion");
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, load }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
