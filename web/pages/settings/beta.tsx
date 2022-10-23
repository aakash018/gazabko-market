import Image from "next/image";
import React, { useRef } from "react";
import { AiFillHeart } from "react-icons/ai";

import { TbGift } from "react-icons/tb";
import { MdStorefront, MdVerifiedUser } from "react-icons/md";
import Layout from "../../components/Customer/Layout";

import ProfileInfoHolder from "../../components/shared/Customer/ProfileInfoHolder";

import styles from "../../styles/components/Customer/pages/SettingsPage.module.scss";
import Timer from "../../components/shared/Customer/Timer";
import SettingPageSettingHolder from "../../components/shared/Customer/SettingPageSettingHolder";
import Router from "next/router";

const SettingsPage = () => {
  const username = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const deliveryAddress = useRef<HTMLInputElement>(null);
  const nearestLandmark = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  return (
    <Layout sidebar="show">
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginTop: "40px" }}>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", fontSize: "14px" }}>
              <span>Hello, Joshep Miles</span> &nbsp;
              <span title="Verified User" style={{ color: "green" }}><MdVerifiedUser /></span>
            </div>
          </div>
          <div>
          <SettingPageSettingHolder
            title="Edit Profile"
            subtitle="username, password etc."
            onClick={() => {
              Router.push("/settings/editProfile");
            }}
          />
          <SettingPageSettingHolder
            title="Shipping addresses"
            subtitle="3 ddresses"
            onClick={() => {}}
          />
          <SettingPageSettingHolder
            title="Payment Options"
            subtitle="debit card, credit card, online wallet etc."
            onClick={() => {}}
          />
          <SettingPageSettingHolder
            title="Order History"
            subtitle="order history"
            onClick={() => {}}
          />
          <SettingPageSettingHolder
            title="Promocodes"
            subtitle="You have special promocodes"
            onClick={() => {}}
          />
        </div>
        </div>
        <div>
          <h1>Settings</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ border: "1px solid #ddd", marginTop: "20px", padding: "10px 50px 10px 20px" }}>
              <span style={{ fontSize: "16px" }}>My Profile</span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", width: "150px", height: "150px" }} className={styles.profileImg}>
                  <Image
                    src={"/images/avatar.jpg"}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    Joshep Miles
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    joshep@gmail.com
                  </div>
                  <div>986247956</div>
                  <div style={{ display: "flex", gap: "5px", marginTop: "10px", color: "var(--default-red)", fontSize: "16px" }}>
                    <div><AiFillHeart /></div>
                    <div><TbGift /></div>
                    <div><MdStorefront /></div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ border: "1px solid #ddd", marginTop: "20px", padding: "10px 60px 15px 15px" }}>
              <span style={{ fontSize: "16px" }}>Address Book</span>
              <div style={{ display: "flex", marginTop: "5px" }}>
                <div style={{ display: "flex", flexDirection: "column", paddingRight: "50px", borderRight: "1px solid #ddd" }}>
                  <span style={{ fontSize: "14px", color: "#757575" }}>Default Shipping Address</span>
                  <span style={{ fontWeight: 600, fontSize: "14px", margin: "5px 0px" }}>Joshep</span>
                  <span style={{ fontSize: "14px" }}>Lake Side</span>
                  <span style={{ fontSize: "14px" }}>Pokhara, Lake Side Area</span>
                  <span style={{ fontSize: "14px" }}>joshep@gmail.com</span>
                  <span style={{ fontSize: "14px" }}>(+977) 986247956</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "20px" }}>
                  <span style={{ fontSize: "14px", color: "#757575" }}>Default Billing Address</span>
                  <span style={{ fontWeight: 600, fontSize: "14px", margin: "5px 0px" }}>Joshep</span>
                  <span style={{ fontSize: "14px" }}>Lake Side</span>
                  <span style={{ fontSize: "14px" }}>Pokhara, Lake Side Area</span>
                  <span style={{ fontSize: "14px" }}>joshep@gmail.com</span>
                  <span style={{ fontSize: "14px" }}>(+977) 986247956</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
