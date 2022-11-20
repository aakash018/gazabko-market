import React, { useState } from "react";

import { MdVerifiedUser } from "react-icons/md";
import Layout from "../../components/Customer/Layout";

import styles from "../../styles/components/Customer/pages/SettingsPage.module.scss";

import SettingPageSettingHolder from "../../components/shared/Customer/SettingPageSettingHolder";
import Router from "next/router";

import EditProfile from "../../components/Customer/settingPages/editProfile";
import SettingHomePage from "../../components/Customer/settingPages/home";

const SettingsPage = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", fontSize: "14px" }}>
              <span>
                Hello,{" "}
                <span
                  style={{
                    color: "var(--theme-color)",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => setPage(1)}
                >
                  Joshep Miles
                </span>
              </span>{" "}
              &nbsp;
              <span title="Verified User" style={{ color: "green" }}>
                <MdVerifiedUser />
              </span>
            </div>
          </div>
          <div>
            <SettingPageSettingHolder
              title="Edit Profile"
              subtitle="username, password etc."
              onClick={() => {
                setPage(2);
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
        <div className={styles.pages}>
          {page === 1 && <SettingHomePage />}
          {page === 2 && <EditProfile />}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
