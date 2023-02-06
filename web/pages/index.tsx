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
import { OfferType, ProtuctType } from "../@types/global";
import { useAlert } from "./_app";

const Home = () => {
  const [bannerModalIsOpen, setIsOpen] = useState(false);

  const { isLogedIn, showBanners, disableBanners } = useAuth();

  const [modalLoginReminderOpen, setIsLoginReminderOpen] = useState(false);
  const [products, setProducts] = useState<ProtuctType[]>([]);
  const [offers, setOffers] = useState<OfferType[]>([]);
  const { setAlert } = useAlert();
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
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { offers?: OfferType[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/offers/getOffers`,
            { withCredentials: true }
          );
          if (res.data.status === "ok" && res.data.offers) {
            console.log(res.data);
            setOffers(res.data.offers);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }

          const productRes = await axios.get<
            RespondType & { products?: ProtuctType[] }
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products`);

          if (productRes.data.status === "ok" && productRes.data.products) {
            console.log(productRes.data.products);
            setProducts(productRes.data.products);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load offers",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
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

            {offers.length !== 0 && (
              <ShowCase
                includeTimer={true}
                expireDate={new Date(offers[0].ending_date).getTime()}
                title={offers[0].name}
                products={offers[0].products}
                isOffer={offers[0].common_discount}
                offerDiscount={offers[0].discount as number}
              />
            )}
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
            {offers.map((offer, i) => {
              if (i !== 0)
                return (
                  <ShowCase
                    includeTimer={true}
                    expireDate={new Date(offer.ending_date).getTime()}
                    title={offer.name}
                    noOfProducts={5}
                    isOffer={offer.common_discount}
                    offerDiscount={offer.discount as number}
                    products={offer.products}
                  />
                );
            })}
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
