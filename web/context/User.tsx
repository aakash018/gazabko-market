import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type authContextType = {
  user: User | null;

  isLogedIn: boolean;
  showBanners: boolean;
  login: (usernme: string, password: string) => any;
  logout: () => any;
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

  const login = async (username: string, password: string) => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      username: username,
      password: password,
    });

    console.log(res.data.user);

    if (res.data.status !== "ok") {
      return res.data;
    }

    setUser(res.data.user);
    setLoginStatus(true);
    return res.data;
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
