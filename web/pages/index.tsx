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
import CatogriesGrid from "../components/Customer/CatogiesGrid";
import Button from "../components/shared/Button";
import { customStyles } from "../modalStyle";

const Home = () => {
  const [bannerModalIsOpen, setIsOpen] = useState(false);

  const { isLogedIn } = useAuth();

  const [modalLoginReminderOpen, setIsLoginReminderOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function closeLoginReminderModal() {
    setIsLoginReminderOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setIsOpen(true);
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (!isLogedIn) {
      setTimeout(() => {
        setIsLoginReminderOpen(true);
      }, 10000);
    }
  }, []);

  return (
    <>
      <Layout sidebar="hide">
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
          expireDate={new Date("August 26, 2022 23:37:25").getTime()}
          title={"Today's deal"}
          noOfProducts={5}
        />
        <div className={styles.midBanner}>
          <Image
            src={"/images/bigsale.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
            objectPosition={"center"}
            alt="middle"
          />
        </div>
        <ShowCase
          includeTimer={true}
          expireDate={new Date("August 28, 2022 15:37:25").getTime()}
          title={"Big Sale"}
          noOfProducts={5}
        />
        <CatogriesGrid />

        <ShowCase
          includeTimer={false}
          title={"New Products"}
          noOfProducts={5}
        />
        <ShowCase
          includeTimer={false}
          title={"Recomdended Products"}
          noOfProducts={15}
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
      </Layout>
    </>
  );
};

export default Home;
