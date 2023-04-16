import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useIsLoggedIn = () => {
  return useAuth().isLoggedIn;
};
export const useUser = () => {
  return useAuth().user;
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(user);

  const logOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    setUser(localStorage.getItem("auth-token"));
  }, []);

  const loginSuccess = (token) => {
    localStorage.setItem("auth-token", token);
    setUser(token);
  };

  const value = {
    user,
    isLoggedIn,
    loginSuccess,
    logOut,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
