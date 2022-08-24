import React, { useRef } from "react";
import styles from "../../styles/components/Admin/pages/LoginPage.module.scss";
import Image from "next/image";
import IntputField from "../../components/shared/Input";
import Button from "../../components/shared/Button";

const AdminLoginPage = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

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
            <Button onClick={() => {}}>LOGIN</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
