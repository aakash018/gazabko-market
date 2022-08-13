import Image from "next/image";
import React, { useState } from "react";
import SearchBarCustomer from "../shared/Customer/SearchBar";
import styles from "../../styles/components/shared/Customer/CustomerNav.module.scss";
import Button from "../shared/Button";
import Router from "next/router";
import { useAuth } from "../../context/User";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const CustomerNav: React.FC = () => {
  const { isLogedIn, logout } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleShoProfileOpions = () => {
    setShowProfileOptions((prev) => !prev);
  };

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
        {!isLogedIn && (
          <div className={styles.actionBtns}>
            <Button
              onClick={() => {
                Router.push("/login");
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                Router.push("/signup");
              }}
              color="success"
            >
              Signup
            </Button>
          </div>
        )}
        {isLogedIn && (
          <div className={styles.account}>
            <div className={styles.cartAndWishlist}>
              <AiOutlineShoppingCart
                size={25}
                onClick={() => {
                  Router.push("/cart");
                }}
              />
              <AiFillHeart size={25} />
            </div>
            <div
              className={`${showProfileOptions ? styles.profileOptions : ""}`}
            >
              <div
                className={`${styles.accountImg} `}
                onClick={handleShoProfileOpions}
              >
                <div
                  className={`${styles.accountImgContainer} ${
                    showProfileOptions ? styles.moveAccountImage : ""
                  }`}
                >
                  <Image
                    src="/images/avatar.jpg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                {showProfileOptions && (
                  <div className={styles.options}>
                    <ul>
                      <li>
                        <Link href={"/settings"}>Settings</Link>
                      </li>
                      <li
                        onClick={() => {
                          logout();
                        }}
                      >
                        SignOut
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default CustomerNav;
