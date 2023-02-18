import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/User";
import { useAlert } from "../../pages/_app";

interface Props {
  children: React.ReactNode;
}

const PrivatePage: React.FC<Props> = ({ children }) => {
  const { isLogedIn, user } = useAuth();
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLogedIn && !user) {
      setAlert({
        type: "error",
        message: "can't access the page",
      });
      Router.push("/");
    }
  }, [isLogedIn, user]);

  return <>{children}</>;
};

export default PrivatePage;
