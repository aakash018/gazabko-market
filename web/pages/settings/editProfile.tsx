import React, { useRef } from "react";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";

import styles from "../../styles/components/Customer/pages/settings/EditProfile.module.scss";

import Image from "next/image";

const EditProfile: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const deliveryAddress = useRef<HTMLInputElement>(null);
  const nearestLandmark = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Layout sidebar="hide">
        <div className={styles.upperPart}>
          <section className={styles.profileSettings}>
            <Input input={username} label="Username" />
            <Input input={username} label="First Name" />
            <Input input={username} label="Last Name" />
            <Input input={username} label="Delivery address" />
            <Input input={username} label="Nearest Landmark" />
            <Input input={username} label="Phone no." />
            <Input input={username} label="Email" />

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
              <Input input={username} label="Old Password" />
              <Input input={username} label="New Password" />
              <Input input={username} label="Confirm Password" />
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditProfile;
