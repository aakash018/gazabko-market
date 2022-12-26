import React, { useRef, useState } from "react";
import Layout from "../../../components/Customer/Layout";
import SettingPageSettingHolder from "../../../components/shared/Customer/SettingPageSettingHolder";

import styles from "../../../styles/components/Customer/pages/settings/Manage.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../components/shared/Button";
import Router, { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";
import InputField from "../../../components/shared/Input";
import axios from "axios";
import { useAlert } from "../../_app";

const UserInput: React.FC<{ title: "Review" | "Return" | "Report" }> = ({
  title,
}) => {
  const router = useRouter();
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const { pid } = router.query;
  const { setAlert } = useAlert();
  const handleSubmit = async () => {
    if (reviewRef.current && reviewRef.current.value.trim() !== "") {
      const payload = {
        pid,
        review: reviewRef.current.value,
        rating: 4.5,
      };
      try {
        const res = await axios.post<RespondType>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/review`,
          payload,
          { withCredentials: true }
        );

        if (res.data.status === "ok") {
          setAlert({
            type: "message",
            message: res.data.message,
          });
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "error posting review",
        });
      }
    } else {
      console.log(reviewRef.current);
    }
  };

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
            <InputField placeholder="Subject" />
          </div>
        )}
        <textarea
          placeholder={title !== "Review" ? "write a message" : "write review"}
          ref={reviewRef}
        ></textarea>
        <Button onClick={handleSubmit}>
          {title === "Return" ? "Send Return Request" : "Post"}
        </Button>
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
