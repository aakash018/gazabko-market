import axios from "axios";
import Router from "next/router";
import React, { useRef } from "react";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";
import { useAuth } from "../../context/User";

import styles from "../../styles/components/Customer/pages/SellerLogin.module.scss";
import { useAlert } from "../_app";

const SellerLogin = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { setAlert } = useAlert();
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (
      username.current?.value.trim() === "" ||
      password.current?.value.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields!",
      });
    }

    const res = await login(
      username.current!.value,
      password.current!.value,
      "seller"
    );

    if (res.status === "ok") {
      setAlert({
        type: "message",
        message: res.message,
      });
      Router.push("/seller/dash");
    } else {
      setAlert({
        type: "error",
        message: res.message,
      });
    }
  };

  return (
    <Layout>
      <div className={styles.sellerLogin}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.main}>Welcome,</div>
            <div className={styles.sub}>
              Sell On GazabzoMarket, BOOM Your Buissness
            </div>
          </div>
          <IntputField label="Username" input={username} />
          <IntputField label="Password" type="password" input={password} />
          <div className={styles.actBtn}>
            <Button onClick={handleSubmit}>Login</Button>
            <Button
              color="success"
              onClick={() => Router.push("/seller/signup")}
            >
              Need an Account? SIGNUP
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerLogin;
