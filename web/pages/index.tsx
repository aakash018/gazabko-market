import Image from "next/image";
import React, { useState, useEffect } from "react";
import Banner from "../components/Customer/Banner";

import Layout from "../components/Customer/Layout";
import ShowCase from "../components/Customer/ShowCase";
import Modal from "react-modal";

import styles from "../styles/components/Customer/Home.module.scss";

import { MdCancel } from "react-icons/md";
import LoginReminder from "../components/Customer/LoginReminder";
import { useAuth } from "../context/User";
import Button from "../components/shared/Button";
import { customStyles } from "../modalStyle";
import CatogriesGridBox from "../components/Customer/CatogriesGridBox";
import axios from "axios";

const Home = () => {
  const [bannerModalIsOpen, setIsOpen] = useState(false);

  const { isLogedIn, showBanners, disableBanners } = useAuth();

  const [modalLoginReminderOpen, setIsLoginReminderOpen] = useState(false);
  const [products, setProducts] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }
  function closeLoginReminderModal() {
    setIsLoginReminderOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      if (showBanners) {
        setIsOpen(true);
        disableBanners();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isLogedIn) {
      setTimeout(() => {
        setIsLoginReminderOpen(true);
      }, 10000);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products`,
        { withCredentials: true }
      );
      setProducts(res.data.products);
    })();
  }, []);

  return (
    <>
      <Layout sliderCategories={true}>
        <div className={styles.homePageWraper}>
          <div className={styles.homePageContainer}>
            <Modal
              isOpen={modalLoginReminderOpen}
              style={customStyles}
              onRequestClose={closeLoginReminderModal}
            >
              <LoginReminder />
            </Modal>
            <Modal
              isOpen={bannerModalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Popoup banner Modal"
            >
              <div className={styles.popupBanner}>
                <div
                  className={styles.cancelBtn}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <MdCancel />
                </div>
                <div className={styles.bannerImg}>
                  <Image
                    src="/images/popup_banner.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition={"top"}
                  />
                </div>
              </div>
            </Modal>
            <Banner />
            <ShowCase
              includeTimer={true}
              expireDate={new Date("Jan 26, 2022 23:37:25").getTime()}
              title={"Today's deal"}
              products={products.slice(0, 5)}
            />
            <div className={styles.midBanner}>
              <Image
                src={"/images/sale.png"}
                layout="fill"
                priority={true}
                objectFit="contain"
                objectPosition={"center"}
                alt="middle"
              />
            </div>
            <ShowCase
              includeTimer={true}
              expireDate={new Date("Jan 28, 2023 15:37:25").getTime()}
              title={"Big Sale"}
              noOfProducts={5}
              products={products.slice(3, 8)}
            />
            <div className={styles.catogriesGrid}>
              <div className={styles.title}>Catogries</div>
              <CatogriesGridBox />
            </div>
            <ShowCase
              includeTimer={false}
              title={"New Products"}
              products={products.slice(2, 7)}
            />
            <ShowCase
              includeTimer={false}
              title={"Recomdended Products"}
              products={products}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button look="outlined">Load More</Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
