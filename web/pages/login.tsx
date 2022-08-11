import Image from "next/image";
import React, { FormEvent, useRef } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import IntputField from "../components/shared/Input";

import styles from "../styles/components/Customer/Login.module.scss";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/User";
import Router from "next/router";

const Login: React.FC = () => {
  const loginRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const handelLogin = (e: FormEvent) => {
    e.preventDefault();
    login();
    Router.push("/");
  };

  return (
    <Layout sidebar="hide">
      <div className={styles.loginContainer}>
        <div className={styles.login}>
          <div className={styles.login__logo}>
            <Image src="/images/logo.png" width={180} height={60} alt="logo" />
          </div>
          <div className={styles.login__text}>
            <section className={styles.login__text_main}>
              <h1>Welcome to Gazabko Market ! </h1>
            </section>
            <section className={styles.login__text_sub}>
              Please sign-in to start your shopping
            </section>
          </div>
          <div className={styles.login__input}>
            <form onSubmit={handelLogin}>
              <IntputField input={loginRef} placeholder="Username" />
              <IntputField
                input={loginRef}
                placeholder="Password"
                type={"password"}
              />
              <Button color="default" type="submit">
                Login
              </Button>
            </form>
          </div>
          <div className={styles.login__forgotPassword}>Forgot Password</div>
          <div className={styles.login__signup}>
            New Customer? <span> Create an account</span>
          </div>
          <div className={styles.login__or}>or</div>
          <div className={styles.login__loginOptions}>
            <FaFacebook />
            <FcGoogle />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
