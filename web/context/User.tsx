import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type authContextType = {
  user: User | null;

  isLogedIn: boolean;
  showBanners: boolean;
  login: () => void;
  logout: () => void;
  disableBanners: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  isLogedIn: true,
  showBanners: true,
  login: () => {},
  logout: () => {},
  disableBanners: () => {},
};

const Context = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(Context);
}

const Provider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogedIn, setLoginStatus] = useState<boolean>(false);
  const [showBanners, setShowBanners] = useState<boolean>(true);

  const login = () => {
    setLoginStatus(true);
  };
  const logout = () => {
    setLoginStatus(false);
  };

  const disableBanners = () => {
    setShowBanners(false);
  };

  const value = {
    user,
    isLogedIn,
    showBanners,
    login,
    logout,
    disableBanners,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
