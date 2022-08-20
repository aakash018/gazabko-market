import Image from "next/image";
import Router from "next/router";
import React from "react";
import styles from "../../styles/components/Customer/LoginReminder.module.scss";
import Button from "../shared/Button";

const LoginReminder: React.FC = () => {
  return (
    <div className={styles.loginReminder}>
      <div className={styles.title}>Login to Account</div>
      <div className="line" style={{ marginTop: 10 }}></div>
      <div className={styles.content}>
        <div className={styles.icon}>
          <Image
            src={"/images/wave.png"}
            layout="fill"
            objectFit="cover"
            alt="wave"
          />
        </div>
        <div className={styles.text}>
          <section className={styles.title}>
            Login garnus Gazzabko Shopping garnu hos !
          </section>
          <section>Click the Login below and start without any delay</section>
          <Button
            onClick={() => {
              Router.push("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginReminder;
