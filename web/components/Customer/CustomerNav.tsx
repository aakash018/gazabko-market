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
    <header className={styles.header}>
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
              look="blank"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                Router.push("/signup");
              }}
              color="success"
              look="outlined"
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
                      <li
                        onClick={() => {
                          Router.push("/orderHistory");
                        }}
                      >
                        Order Details
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* <div className={styles.bottomInfo}>
        <ul>
          <li>Contact Us at: 9846523283</li>
          <li>SELL ON DARAZ</li>
          <li>CUSTOMER CARE</li>
        </ul>
      </div> */}
    </header>
  );
};

export default CustomerNav;
