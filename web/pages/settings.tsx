import Image from "next/image";
import React, { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import ProfileInfoHolder from "../components/shared/Customer/ProfileInfoHolder";
import Intput from "../components/shared/Input";
import styles from "../styles/components/Customer/pages/SettingsPage.module.scss";

const SettingsPage = () => {
  const username = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const deliveryAddress = useRef<HTMLInputElement>(null);
  const nearestLandmark = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  return (
    <Layout sidebar="show">
      <div className={styles.settingsPage}>
        <section className={styles.title}>My Profile</section>
        <div className={styles.infoSection}>
          <ProfileInfoHolder number={46} title="Total purcheses done" />
          <ProfileInfoHolder number={4} title="Items in wishlist" />
          <ProfileInfoHolder number={6} title="Items in cart" />
          <ProfileInfoHolder number={1} title="Item out for delivery" />
          <ProfileInfoHolder number={8} title="Favourite Seller" />
        </div>
        <div className={styles.upperPart}>
          <section className={styles.profileSettings}>
            <Intput input={username} label="Username" />
            <Intput input={username} label="First Name" />
            <Intput input={username} label="Last Name" />
            <Intput input={username} label="Delivery address" />
            <Intput input={username} label="Nearest Landmark" />
            <Intput input={username} label="Phone no." />
            <Intput input={username} label="Email" />

            <Button>Save</Button>
          </section>
          <section className={styles.profilePic}>
            <section className={styles.profilePicHolder}>
              <Image
                src="/images/avatar.jpg"
                layout="fill"
                alt="avatar"
                objectFit="cover"
              />
            </section>
            <Button>Change Avatar</Button>
          </section>
        </div>

        <div className={styles.passwordSettings}>
          <section className={styles.title}>Password Setting</section>
          <Intput input={username} label="Old Password" />
          <Intput input={username} label="New Password" />
          <Intput input={username} label="Confirm Password" />
          <Button>Save</Button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
