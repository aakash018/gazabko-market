import React from "react";
import styles from "../../../styles/components/shared/Customer/MobileBottomNavBar.module.scss";
import { AiFillHeart, AiFillHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../../context/User";
import Button from "../Button";
const MobileBottomNavBar = () => {
  const router = useRouter();

  const { isLogedIn } = useAuth();

  return (
    <div className={styles.mobileNav}>
      {!isLogedIn && (
        <>
          <div>
            <Button
              look="outlined"
              onClick={() => {
                Router.push("/login");
              }}
            >
              Login
            </Button>
          </div>
        </>
      )}
      {isLogedIn && (
        <>
          <div
            className={`${styles.icon} ${
              router.pathname === "/cart" ? styles.active : ""
            }`}
            onClick={() => {
              Router.push("/cart");
            }}
          >
            <AiOutlineShoppingCart />
          </div>
          <div
            className={`${styles.icon} ${
              router.pathname === "/orderHistory/wishlist" ? styles.active : ""
            }`}
            onClick={() => {
              Router.push("/orderHistory/wishlist");
            }}
          >
            <AiFillHeart />
          </div>
        </>
      )}
      <div
        className={`${styles.icon} ${
          router.pathname === "/" ? styles.active : ""
        }`}
        onClick={() => {
          Router.push("/");
        }}
      >
        <AiFillHome />
      </div>
      {!isLogedIn && (
        <div>
          <Button
            look="filled"
            color="error"
            onClick={() => {
              Router.push("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      )}
      {isLogedIn && (
        <>
          <div
            className={`${styles.icon} ${
              router.pathname === "/settings" ? styles.active : ""
            }`}
            onClick={() => {
              Router.push("/settings");
            }}
          >
            <FaUserAlt />
          </div>
          <div
            className={`${styles.icon} ${
              router.pathname === "/mobileCat" ? styles.active : ""
            }`}
            onClick={() => {
              Router.push("/#");
            }}
          >
            <BiCategoryAlt />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileBottomNavBar;
