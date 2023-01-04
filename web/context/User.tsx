import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type authContextType = {
  user: User | null;

  isLogedIn: boolean;
  showBanners: boolean;
  login: (
    usernme: string,
    password: string,
    type: "seller" | "admin" | "customer"
  ) => any;
  logout: () => Promise<{
    status: "ok" | "fail";
    message: string;
  }> | null;
  disableBanners: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  isLogedIn: true,
  showBanners: true,
  login: () => {},
  logout: () => {
    return null;
  },
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        const res = await axios.get<{
          status: "ok" | "fail";
          message: "string";
          user: User;
        }>(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/auth/presistUser`, {
          withCredentials: true,
        });

        if (res.data.status === "ok") {
          setUser(res.data.user);
          setLoginStatus(true);
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const login = async (
    username: string,
    password: string,
    type: "seller" | "admin" | "customer"
  ) => {
    let url;

    if (type === "customer") {
      url = `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/auth/login`;
    } else if (type === "seller") {
      url = `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerAuth/login`;
    } else {
      url = `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/adminAuth/login`;
    }

    const res = await axios.post(
      url,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );

    if (res.data.status !== "ok") {
      return res.data;
    }

    setUser(res.data.user);

    setLoginStatus(true);
    return res.data;
  };
  const logout = async (): Promise<{
    status: "ok" | "fail";
    message: string;
  }> => {
    const res = await axios.get<{ status: "ok" | "fail"; message: string }>(
      "http://localhost:5000/auth/logout",
      { withCredentials: true }
    );

    if (res.data.status === "ok") {
      setUser(null);
      setLoginStatus(false);
      return res.data;
    }

    return res.data;
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
