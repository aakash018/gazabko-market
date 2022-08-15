import Image from "next/image";
import React from "react";
import Banner from "../components/Customer/Banner";
import CatogriesSideBar from "../components/Customer/CatogriesSideBar";
import CustomerNav from "../components/Customer/CustomerNav";
import Layout from "../components/Customer/Layout";
import ShowCase from "../components/Customer/ShowCase";
import ProductHolder from "../components/shared/Customer/ProductHolder";
import Timer from "../components/shared/Customer/Timer";
import { useAuth } from "../context/User";

import styles from "../styles/components/Customer/Home.module.scss";

const Home = () => {
  return (
    <>
      <Layout sidebar="hide">
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

        <ShowCase
          includeTimer={false}
          title={"New Products"}
          noOfProducts={5}
        />
        <ShowCase
          includeTimer={false}
          title={"Recomdended Products"}
          noOfProducts={5}
        />
      </Layout>
    </>
  );
};

export default Home;
