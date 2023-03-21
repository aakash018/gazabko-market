import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Seller } from "../../@types/global";
import SellerNav from "../../components/Seller/SellerNav";
import Button from "../../components/shared/Button";
import ImageUploader from "../../components/shared/ImageUploader";
import IntputField from "../../components/shared/Input";
import { useAuth } from "../../context/User";

import styles from "../../styles/components/Seller/pages/Account.module.scss";
import { useAlert } from "../_app";

const Account: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [email, setEmail] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { setAlert } = useAlert();

  const ignoreEffect = useRef(false);

  useEffect(() => {
    if (!ignoreEffect.current) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { seller: Seller }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerAuth/me`,
            {
              withCredentials: true,
            }
          );
          console.log(res.data);
          if (res.data.status === "ok") {
            setUsername(res.data.seller.username);
            setStoreAddress(res.data.seller.address);
            setStoreName(res.data.seller.storeName);
            setContactPerson(res.data.seller.contactPerson);
            setPhoneNo(res.data.seller.phoneNo);
            setPanNo(res.data.seller.panNo || "");
            setEmail(res.data.seller.email || "");
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (error) {
          console.log(error);
          setAlert({
            type: "error",
            message: "failed to connect to servers",
          });
        }
      })();
    }

    return () => {
      ignoreEffect.current = true;
    };
  }, []);

  const handleInfoSubmit = async () => {
    if (
      username.trim() === "" ||
      storeName.trim() === "" ||
      storeAddress.trim() === "" ||
      contactPerson.trim() === "" ||
      phoneNo.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/update/info`,
        {
          username,
          storeAddress,
          storeName,
          contactPerson,
          phoneNo,
          panNo,
          email,
        },
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
    } catch (e) {
      console.log(e);
      setAlert({
        type: "error",
        message: "failed to send info for verification",
      });
    }
  };

  const handlePassSubmit = async () => {
    if (
      oldPass.trim() === "" ||
      newPass.trim() === "" ||
      confirmPass.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    if (newPass !== confirmPass) {
      return setAlert({
        type: "error",
        message: "confirm password didn't match",
      });
    }

    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/update/password`,
        {
          oldPass,
          newPass,
        },
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
    } catch (e) {
      console.log(e);
      setAlert({
        type: "error",
        message: "failed to update password",
      });
    }
  };

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
            <div className={styles.title}>Store Information</div>
            <IntputField
              label="Username"
              value={username}
              setState={setUsername}
            />
            <IntputField
              label="Store's Name"
              value={storeName}
              setState={setStoreName}
            />
            <IntputField
              label="Store's Address"
              value={storeAddress}
              setState={setStoreAddress}
            />
            <IntputField
              label="Contact Person"
              value={contactPerson}
              setState={setContactPerson}
            />
            <IntputField
              label="Phone No."
              value={phoneNo}
              setState={setPhoneNo}
            />
            <IntputField label="Email" value={email} setState={setEmail} />
            <IntputField label="Pan No." value={panNo} setState={setPanNo} />
            <Button onClick={handleInfoSubmit}>Send for Verification</Button>
          </div>
          <div className={styles.password}>
            <div className={styles.title}>Change Password</div>
            <IntputField
              label="Old Password"
              type={"password"}
              value={oldPass}
              setState={setOldPass}
            />
            <IntputField
              label="New Password"
              type={"password"}
              value={newPass}
              setState={setNewPass}
            />
            <IntputField
              label="Confirm Password"
              type={"password"}
              value={confirmPass}
              setState={setConfirmPass}
            />
            <Button onClick={handlePassSubmit}>Save</Button>
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
