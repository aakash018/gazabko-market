import React from "react";
import Image from "next/image";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const Review = ({ rating, review }: { rating: number, review: string }) => {
  return (
    <div>
      <div>
        <section style={{ color: "var(--default-yellow)", marginTop: "5px", fontSize: "16px" }}>
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <span style={{ color: "var(--theme-color)", marginLeft: "5px" }}>{rating}</span>
        </section>
      </div>
      <section style={{ marginTop: "5px", fontSize: "13px", lineHeight: "1.7em" }}>{review}</section>
    </div>
  );
};

const OrderHistoryPage: React.FC = () => {
  return (
    <OrderHistoryLayout>
      <div className={styles.title}>My Reviews</div>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: "20px", backgroundColor: "#eee", padding: "20px" }}>
        <div style={{ position: "relative", width: "150px", height: "150px" }}>
          <Image
            src={"/images/shoes.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div style={{ width: "calc(100% - 100px)" }}>
          <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}>Ultra Light 3 Layer Silicone Jacket For Men</div>
          <div>Size: XXL, Color: Yellow</div>
          <Review rating={4.5} review="It is one of the best shoes ever I have ever wore in my entire life. Such an amazing fit for my legs and such a shine it brings to my feet that I am overwhelmed with joy. I would recommend this to my family, society, nation and to the world. It deserves that much praise." />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: "20px", backgroundColor: "#eee", padding: "20px" }}>
        <div style={{ position: "relative", width: "150px", height: "150px" }}>
          <Image
            src={"/images/shoes.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div style={{ width: "calc(100% - 100px)" }}>
          <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}>Ultra Light 3 Layer Silicone Jacket For Men</div>
          <div>Size: XXL, Color: Yellow</div>
          <Review rating={4.5} review="It is one of the best shoes ever I have ever wore in my entire life. Such an amazing fit for my legs and such a shine it brings to my feet that I am overwhelmed with joy. I would recommend this to my family, society, nation and to the world. It deserves that much praise." />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: "20px", backgroundColor: "#eee", padding: "20px" }}>
        <div style={{ position: "relative", width: "150px", height: "150px" }}>
          <Image
            src={"/images/shoes.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div style={{ width: "calc(100% - 100px)" }}>
          <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}>Ultra Light 3 Layer Silicone Jacket For Men</div>
          <div>Size: XXL, Color: Yellow</div>
          <Review rating={4.5} review="It is one of the best shoes ever I have ever wore in my entire life. Such an amazing fit for my legs and such a shine it brings to my feet that I am overwhelmed with joy. I would recommend this to my family, society, nation and to the world. It deserves that much praise." />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: "20px", backgroundColor: "#eee", padding: "20px" }}>
        <div style={{ position: "relative", width: "150px", height: "150px" }}>
          <Image
            src={"/images/shoes.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div style={{ width: "calc(100% - 100px)" }}>
          <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}>Ultra Light 3 Layer Silicone Jacket For Men</div>
          <div>Size: XXL, Color: Yellow</div>
          <Review rating={4.5} review="It is one of the best shoes ever I have ever wore in my entire life. Such an amazing fit for my legs and such a shine it brings to my feet that I am overwhelmed with joy. I would recommend this to my family, society, nation and to the world. It deserves that much praise." />
        </div>
      </div>
    </OrderHistoryLayout>
  );
};

export default OrderHistoryPage;
