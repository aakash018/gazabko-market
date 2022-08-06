import Image from "next/image";
import React from "react";
import SearchBarCustomer from "../shared/Customer/SearchBar";
import styles from "../../styles/components/shared/Customer/CustomerNav.module.scss";
import Button from "../shared/Button";
import Router from "next/router";

const CustomerNav: React.FC = () => {
  return (
    <header>
      <nav className={styles.customerNav}>
        <section className="logo">
          <Image
            src="/images/logo.png"
            width={180}
            height={60}
            alt="logo"
            onClick={() => Router.push("/")}
          />
        </section>
        <SearchBarCustomer />
        <div className={styles.actionBtns}>
          <Button
            onClick={() => {
              Router.push("/login");
            }}
          >
            Login
          </Button>
          <Button onClick={() => {}} color="success">
            Signup
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default CustomerNav;
