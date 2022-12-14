import React, { useState } from "react";

import { MdVerifiedUser } from "react-icons/md";
import Layout from "../../components/Customer/Layout";

import styles from "../../styles/components/Customer/pages/SettingsPage.module.scss";

import SettingPageSettingHolder from "../../components/shared/Customer/SettingPageSettingHolder";
import Router from "next/router";

import EditProfile from "../../components/Customer/settingPages/editProfile";
import SettingHomePage from "../../components/Customer/settingPages/home";
import ShippingAddress from "../../components/Customer/settingPages/ShippingAddress";
import FavouriteSeller from "../../components/Customer/settingPages/favouriteSeller";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/User";
import { useAlert } from "../_app";
import PrivatePage from "../../components/shared/PrivatePage";

const SettingsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { logout } = useAuth();
  const { setAlert } = useAlert();

  return (
    <PrivatePage>
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
                title="Favourite Seller"
                subtitle="7 seller favourited"
                onClick={() => {
                  setPage(2);
                }}
              />
              <SettingPageSettingHolder
                title="Edit Profile"
                subtitle="username, password etc."
                onClick={() => {
                  setPage(3);
                }}
              />
              <SettingPageSettingHolder
                title="Shipping addresses"
                subtitle="3 ddresses"
                onClick={() => {
                  setPage(4);
                }}
              />
              <SettingPageSettingHolder
                title="Payment Options"
                subtitle="debit card, credit card, online wallet etc."
                onClick={() => {}}
              />
              <SettingPageSettingHolder
                title="Order History & Reviews"
                subtitle="order history | wishlist | reviews"
                onClick={() => {
                  Router.push("/orderHistory");
                }}
              />
              <SettingPageSettingHolder
                title="Promocodes"
                subtitle="You have special promocodes"
                onClick={() => {}}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  color="error"
                  onClick={async () => {
                    const res = await logout();
                    console.log(res);
                    if (res?.status === "ok") {
                      setAlert({
                        type: "message",
                        message: res.message,
                      });
                      Router.push("/");
                    } else {
                      setAlert({
                        type: "error",
                        message: "error logging out",
                      });
                    }
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div
            className={styles.pages}
            style={{
              width: "100%",
            }}
          >
            {page === 1 && <SettingHomePage />}
            {page === 2 && <FavouriteSeller />}
            {page === 3 && <EditProfile />}
            {page === 4 && <ShippingAddress />}
          </div>
        </div>
      </Layout>
    </PrivatePage>
  );
};

export default SettingsPage;
