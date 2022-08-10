import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type authContextType = {
  user: User | null;

  isLogedIn: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  isLogedIn: true,
  login: () => {},
  logout: () => {},
};

const Context = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(Context);
}

const Provider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogedIn, setLoginStatus] = useState<boolean>(true);

  const login = () => {
    setLoginStatus(true);
  };
  const logout = () => {
    setLoginStatus(false);
  };

  const value = {
    user,
    isLogedIn,
    login,
    logout,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
