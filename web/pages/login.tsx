import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import IntputField from "../components/shared/Input";

import styles from "../styles/components/Customer/Login.module.scss";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/User";
import Router from "next/router";
import { useAlert } from "./_app";
import axios from "axios";
import Link from "next/link";

const Login: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [recoverCode, setRecoverCode] = useState("");

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { login } = useAuth();
  const { setAlert } = useAlert();

  const handelLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      username.current?.value.trim() === "" ||
      password.current?.value.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "Empty fields",
      });
    }
    setLoading(true);
    const res = await login(
      username.current!.value,
      password.current!.value,
      "customer"
    );
    if (res.status !== "ok") {
      setAlert({
        type: "error",
        message: res.message,
      });
      setLoading(false);
    } else {
      setAlert({
        type: "message",
        message: "Logged successfully",
      });
      Router.push("/");
    }
  };

  const hanldeForgotPassEmailSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/auth/forgotPassword`,
        {
          email,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: "email sent",
        });
        setPage((prev) => prev + 1);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setLoading(false);

      setAlert({
        type: "error",
        message: "failed to send email request",
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/auth/verifyRecoverCode`,
        {
          email,
          recoverCode,
        }
      );
      if (res.data.status === "ok") {
        setPage((prev) => prev + 1);
        setAlert({
          type: "message",
          message: res.data.message,
        });
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to verify code",
      });
    }
  };

  const handleChangeForgottenPassword = async () => {
    if (newPass.trim() === "") {
      return setAlert({
        type: "error",
        message: "empty field",
      });
    }

    if (newPass !== confirmPass) {
      return setAlert({
        type: "error",
        message: "confirm password did not match",
      });
    }

    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/auth/setNewForgottenPassword`,
        {
          newPass,
          email,
        }
      );

      if (res.data.status === "ok") {
        setPage(0);
        setAlert({
          type: "message",
          message: res.data.message,
        });
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to set new password",
      });
    }
  };

  return (
    <Layout showFooter={false}>
      <div className={styles.loginContainer}>
        {page === 0 && (
          <div className={styles.login}>
            <div className={styles.login__logo}>
              <Image
                src="/images/logo.png"
                width={180}
                height={60}
                alt="logo"
              />
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
                <IntputField input={username} placeholder="Username" />
                <IntputField
                  input={password}
                  placeholder="Password"
                  type={"password"}
                />
                <Button color="default" type="submit" disable={loading}>
                  {loading ? "Loading" : "Login"}
                </Button>
              </form>
            </div>
            <div
              className={styles.login__forgotPassword}
              style={{ cursor: "pointer", color: "var(--default-red)" }}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Forgot Password
            </div>
            <div className={styles.login__signup}>
              New Customer?{" "}
              <span>
                {" "}
                <Link href={"/signup"}>Create an account</Link>
              </span>
            </div>
            <div className={styles.login__or}>or</div>
            <div className={styles.login__loginOptions}>
              <FaFacebook />
              <FcGoogle />
            </div>
          </div>
        )}
        {page === 1 && (
          <div className={styles.forgotPassword}>
            <div className={styles.info}>
              enter your registered email and we will send a recovery code there
            </div>
            <div className={styles.content}>
              <IntputField label="Email" value={email} setState={setEmail} />
              <Button onClick={hanldeForgotPassEmailSubmit} disable={loading}>
                {loading ? "Loading" : "Send Email"}
              </Button>
              <div
                onClick={() => setPage((page) => page - 1)}
                style={{
                  color: "var(--theme-color)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                <u>Back</u>
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className={styles.code}>
            <div className={styles.info}>
              enter the verification code we sent to your email
            </div>
            <div className={styles.content}>
              <IntputField
                label="Code"
                value={recoverCode}
                setState={setRecoverCode}
              />
              <Button onClick={handleVerifyCode}>Verify</Button>
            </div>
          </div>
        )}
        {page === 3 && (
          <div className={styles.changePassword}>
            <div className={styles.info}>Enter new password</div>
            <div className={styles.content}>
              <IntputField
                label="New Password"
                type={"password"}
                value={newPass}
                setState={setNewPass}
              />
              <IntputField
                label="Confirm Password"
                type={"password"}
                value={confirmPass}
                setState={setConfirmPass}
              />
              <Button onClick={handleChangeForgottenPassword}>Save</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Login;
