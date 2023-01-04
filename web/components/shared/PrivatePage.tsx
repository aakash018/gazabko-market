import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/User";

interface Props {
  children: React.ReactNode;
}

const PrivatePage: React.FC<Props> = ({ children }) => {
  const { isLogedIn, user } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLogedIn && !user) {
      Router.push("/");
    }
  }, [isLogedIn, user]);

  return <>{children}</>;
};

export default PrivatePage;
