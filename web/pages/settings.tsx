import Image from "next/image";
import React, { useRef } from "react";
import { AiFillHeart } from "react-icons/ai";

import { TbGift } from "react-icons/tb";
import { MdStorefront } from "react-icons/md";
import Layout from "../components/Customer/Layout";

import ProfileInfoHolder from "../components/shared/Customer/ProfileInfoHolder";

import styles from "../styles/components/Customer/pages/SettingsPage.module.scss";
import Timer from "../components/shared/Customer/Timer";
import SettingPageSettingHolder from "../components/shared/Customer/SettingPageSettingHolder";

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
        <div className={styles.mainInfo}>
          <div className={styles.avatarContainer}>
            <div>
              <section className={styles.title}>My Profile</section>
            </div>

            <div className={styles.avatar}>
              <Image
                src={"/images/profile_avatar.png"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.profileImg}>
              <Image
                src={"/images/avatar.jpg"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className={styles.data}>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                Joshep Miles
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                joshep@gmial.com
              </div>
              <div>986247956</div>
            </div>
          </div>
          <div className={styles.actionBtns}>
            <div className={styles.buttonHolder}>
              <AiFillHeart />
              <div className={styles.data}>5</div>
            </div>
            <div className={styles.buttonHolder}>
              <TbGift />
              <div className={styles.data}>2</div>
            </div>
            <div className={styles.buttonHolder}>
              <MdStorefront />
              <div className={styles.data}>4</div>
            </div>
          </div>
        </div>
        <div className={styles.midBanner}>
          <Image
            src={"/images/bigsale.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
            objectPosition={"center"}
            alt="middle"
          />
          <div className={styles.timer}>
            <div>Ends in:</div>
            <Timer date={new Date("August 28, 2022 15:37:25").getTime()} />
          </div>
        </div>
        <div className={styles.infoSection}>
          <ProfileInfoHolder number={46} title="Total purcheses done" />
          <ProfileInfoHolder number={4} title="Items in wishlist" />
          <ProfileInfoHolder number={6} title="Items in cart" />
          <ProfileInfoHolder number={1} title="Item out for delivery" />
          <ProfileInfoHolder number={8} title="Favourite Seller" />
        </div>
        <div className={styles.options}>
          <SettingPageSettingHolder
            title="Edit Profile"
            subtitle="username, password etc."
            onClick={() => {}}
          />
          <SettingPageSettingHolder
            title="Shipping addresses"
            subtitle="3 ddresses"
            onClick={() => {}}
          />
          <SettingPageSettingHolder
            title="Promocodes"
            subtitle="You have special promocodes"
            onClick={() => {}}
          />
        </div>
        //? Form for profile edit
        {/* <div className={styles.upperPart}>
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
          <div className={styles.rightSide}>
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
            <div className={styles.passwordSettings}>
              <section className={styles.title}>Password Setting</section>
              <Intput input={username} label="Old Password" />
              <Intput input={username} label="New Password" />
              <Intput input={username} label="Confirm Password" />
              <Button>Save</Button>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default SettingsPage;
