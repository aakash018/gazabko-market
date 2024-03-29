import Image from "next/image";
import React, { useEffect, useState } from "react";
import SearchBarCustomer from "../shared/Customer/SearchBar";
import styles from "../../styles/components/shared/Customer/CustomerNav.module.scss";
import Button from "../shared/Button";
import Router from "next/router";
import { useAuth } from "../../context/User";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import CategoriesHolderMenu from "./CategoriesHolderMenu";
import { Category } from "../../@types/global";
import axios from "axios";
import { useAlert } from "../../pages/_app";

interface Props {
  sliderCategories: boolean;
}

const CustomerNav: React.FC<Props> = ({ sliderCategories }) => {
  const { isLogedIn, user } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { setAlert } = useAlert();
  const [categories, setCategories] = useState<Category[]>([]);
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (!sliderCategories) {
        setShow(true);
        return;
      }
      if (lastScrollY > 370) {
        // if scroll down hide the navbar
        setShow(true);
      } else {
        // if scroll up show the navbar
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await axios.get<RespondType & { categories: Category[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/getAllCategories`
        );
        console.log(res.data);
        if (res.data.status === "ok") {
          setCategories(res.data.categories);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to connect to server",
        });
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleShoProfileOpions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.miniNav} ${!show && styles.showNav}`}>
        <ul>
          <li>
            <Link href={"/seller"}>BECOME A SELLER</Link>
          </li>
          <li>TRACK MY ORDER</li>
          <li>CUSTOMER CARE</li>
        </ul>
      </div>
      <nav className={` ${show && styles.miniNavHidden}`}>
        <div className={styles.customerNav}>
          <section className={styles.logo}>
            <Image
              src="/images/logo.png"
              width={180}
              height={60}
              alt="logo"
              onClick={() => Router.push("/")}
            />
          </section>
          {categories.length !== 0 && (
            <SearchBarCustomer categries={categories} />
          )}
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
          {isLogedIn && user && user.role === "customer" && (
            <div className={styles.account}>
              <div className={styles.cartAndWishlist}>
                <AiOutlineShoppingCart
                  size={25}
                  onClick={() => {
                    Router.push("/cart");
                  }}
                />
                <AiFillHeart
                  size={25}
                  onClick={() => {
                    Router.push("/orderHistory/wishlist");
                  }}
                />
              </div>
              <div
                style={{ zIndex: 200 }}
                className={`${showProfileOptions ? styles.profileOptions : ""}`}
              >
                <div
                  className={`${styles.accountImg} `}
                  onClick={handleShoProfileOpions}
                >
                  <div
                    className={`${styles.accountImgContainer}`}
                    onClick={() => {
                      Router.push("/settings");
                    }}
                  >
                    <Image src={user!.avatar} layout="fill" objectFit="cover" />
                  </div>
                  {/* {showProfileOptions && (
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
                  )} */}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.catogry}  ${show && styles.active} `}>
          {categories.length !== 0 && (
            <div className={styles.text}>
              <CategoriesHolderMenu categories={categories} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default CustomerNav;
