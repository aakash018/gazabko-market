import React from "react";
import styles from "../../../styles/components/shared/Customer/SignUpLayout.module.scss";
import Image from "next/image";
import Layout from "../../Customer/Layout";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface Props {
  children: React.ReactNode;
}

const SignUpLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.logo}>
        <Image src="/images/logo.png" width={180} height={60} alt="logo" />
      </div>
      <div className={styles.text}>
        <section className={styles.main}>
          <h1>Gazabko Shopping starts here </h1>
        </section>
        <section className={styles.sub}>
          Make your shoping easy and fun!
        </section>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.loginInsted}>
        <span className={styles.info}>
          Already have an account? Sign in instead
        </span>
        <section className={styles.or}>or</section>
        <div className={styles.loginOptions}>
          <FaFacebook />
          <FcGoogle />
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
