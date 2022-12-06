import React, { useState } from "react";
import Layout from "../../components/Customer/Layout";
import SettingPageSettingHolder from "../../components/shared/Customer/SettingPageSettingHolder";

import styles from "../../styles/components/Customer/pages/settings/Manage.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/shared/Button";
import Router from "next/router";
import { BsStarFill } from "react-icons/bs";
import IntputField from "../../components/shared/Input";

const UserInput: React.FC<{ title: "Review" | "Return" | "Report" }> = ({
  title,
}) => {
  return (
    <div className={styles.review}>
      <h2>{title}</h2>
      <div className={styles.review}>
        <div>22 June 2022</div>
        <div className={styles.products}>
          <Image src={"/images/shoes2.webp"} width={100} height={100} />
          <div>
            <div>Dizo Buds Z(Paris) model no. DA2117</div>
            <div>Color: White</div>
            {title === "Review" && (
              <div className={styles.rating}>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </div>
            )}
          </div>
        </div>
        {title === "Report" && (
          <div style={{ width: "350px" }}>
            <IntputField placeholder="Subject" />
          </div>
        )}
        <textarea
          placeholder={title !== "Review" ? "write a message" : "write review"}
        ></textarea>
        <Button>{title === "Return" ? "Send Return Request" : "Post"}</Button>
      </div>
    </div>
  );
};

const Manage = () => {
  const [selectedPage, setSelectedPage] = useState<
    "Review" | "Return" | "Report"
  >("Review");

  return (
    <Layout>
      <div className={styles.manage}>
        <div className={styles.options}>
          <SettingPageSettingHolder
            title="Review"
            subtitle="write reviews"
            onClick={() => {
              setSelectedPage("Review");
            }}
          />
          <SettingPageSettingHolder
            title="Return"
            subtitle="return product"
            onClick={() => {
              setSelectedPage("Return");
            }}
          />
          <SettingPageSettingHolder
            title="Report"
            subtitle="report product"
            onClick={() => {
              setSelectedPage("Report");
            }}
          />
        </div>
        <div className={styles.content}>
          <UserInput title={selectedPage} />
        </div>
      </div>
    </Layout>
  );
};

export default Manage;
