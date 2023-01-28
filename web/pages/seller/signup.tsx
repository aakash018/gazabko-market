import axios from "axios";
import React, { useRef } from "react";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";

import styles from "../../styles/components/Customer/pages/SellerSignup.module.scss";
import { useAlert } from "../_app";

const SellerSignup = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const storeName = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const contactPerson = useRef<HTMLInputElement>(null);
  const phoneNo = useRef<HTMLInputElement>(null);
  const panNo = useRef<HTMLInputElement>(null);

  const { setAlert } = useAlert();

  const handleSubmit = async () => {
    // ? For Empty Fields
    if (
      username.current?.value.trim() === "" ||
      storeName.current?.value.trim() === "" ||
      address.current?.value.trim() === "" ||
      password.current?.value.trim() === "" ||
      contactPerson.current?.value.trim() === "" ||
      phoneNo.current?.value.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields !",
      });
    }

    if (password.current?.value !== cpassword.current?.value) {
      return setAlert({
        type: "error",
        message: "confirm password didn't match",
      });
    }

    const payload = {
      username: username.current?.value,
      email: email.current?.value,
      storeName: storeName.current?.value,
      address: address.current?.value,
      password: password.current?.value,
      contactPerson: contactPerson.current?.value,
      phoneNo: phoneNo.current?.value,
      panNo: panNo.current?.value,
    };

    const res = await axios.post(
      "http://localhost:5000/sellerAuth/sellerRegister",
      payload
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
  };

  return (
    <Layout>
      <div className={styles.sellerLogin}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.main}>Welcome,</div>
            <div className={styles.sub}>New Vendor Registration</div>
          </div>
          <div className={styles.inputData}>
            <div>
              <IntputField label="Username" input={username} />
              <IntputField label="Store's Name" input={storeName} />
              <IntputField label="Address" input={address} />
              <IntputField label="Contact Person" input={contactPerson} />
              <IntputField label="Phone No." input={phoneNo} />
            </div>
            <div>
              <IntputField label="Email (Optional)" input={email} />
              <IntputField label="Pan No. (Optional)" input={panNo} />
              <IntputField label="Password" input={password} type="password" />
              <IntputField
                label="Confirm Password"
                input={cpassword}
                type="password"
              />
            </div>
          </div>
          <div className={styles.actBtn}>
            <Button onClick={handleSubmit}>Send For Verification</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerSignup;
