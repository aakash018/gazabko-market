import React, { useRef } from "react";
import styles from "../../styles/components/Admin/pages/LoginPage.module.scss";
import Image from "next/image";
import IntputField from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import Router from "next/router";
import { useAlert } from "../_app";
import axios from "axios";
import { AdminType } from "../../@types/global";
import { useAuth } from "../../context/User";

const AdminLoginPage = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { setAlert } = useAlert();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (
      username.current?.value.trim() === "" ||
      password.current?.value.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    try {
      const resData = await login(
        username.current!.value,
        password.current!.value,
        "admin"
      );

      if (resData.status === "ok") {
        Router.push("/admin/dash");
        setAlert({
          type: "message",
          message: resData.message,
        });
      } else {
        setAlert({
          type: "error",
          message: resData.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to login! unknown error",
      });
    }
  };

  return (
    <>
      <div className={styles.header}>
        <section className="logo">
          <Image src="/images/logo.png" width={180} height={60} alt="logo" />
        </section>
      </div>
      <div className={styles.adminLoginPage}>
        <div className={styles.formHolder}>
          <section className={styles.title}>
            Welcome To Gazabzo Market’s Admin Panel
          </section>
          <form>
            <IntputField input={username} label="Username" />
            <IntputField input={password} label="Password" type={"password"} />
            <Button
              onClick={() => {
                handleLogin();
              }}
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
