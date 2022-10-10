import React, { useRef } from "react";
import styles from "../../styles/components/Admin/pages/LoginPage.module.scss";
import Image from "next/image";
import IntputField from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import Router from "next/router";

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
            <Button
              onClick={() => {
                Router.push("/admin/dash");
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
