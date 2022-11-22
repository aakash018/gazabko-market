import Image from "next/image";
import React, { useRef, useState } from "react";
import SellerNav from "../../components/Seller/SellerNav";
import Button from "../../components/shared/Button";
import ImageUploader from "../../components/shared/ImageUploader";
import IntputField from "../../components/shared/Input";

import styles from "../../styles/components/Seller/pages/Account.module.scss";

const Account: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <SellerNav>
      <h1>Account's Settings</h1>
      <div className={styles.addBanner}>
        <h2>Add a Seller Profile Banner</h2>
        <ImageUploader
          height={500}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          width={1200}
        />
        {selectedImage && <Button>Save</Button>}
      </div>
      <div className={styles.account}>
        <div className={styles.inputs}>
          <div className={styles.storeInfo}>
            <div className={styles.title}>Store Inforamitions</div>
            <IntputField label="Username" />
            <IntputField label="Store's Name" />
            <IntputField label="Store's Address" />
            <IntputField label="Contact Person" />
            <IntputField label="Phone No." />
            <IntputField label="Email" />
            <IntputField label="Pan No." />
            <Button>Send for Verification</Button>
          </div>
          <div className={styles.password}>
            <div className={styles.title}>Change Password</div>
            <IntputField label="Old Password" type={"password"} />
            <IntputField label="New Password" type={"password"} />
            <IntputField label="Confirm Password" type={"password"} />
            <Button>Save</Button>
          </div>
        </div>
        <div className={styles.profilePic}>
          <Image
            src="/images/brand.png"
            width={150}
            height={150}
            objectFit="cover"
          />
          <Button>Change Logo</Button>
        </div>
      </div>
    </SellerNav>
  );
};

export default Account;
