import axios from "axios";
import Router from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AdminType } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

import styles from "../../../styles/components/Admin/pages/Account.module.scss";
import { useAlert } from "../../_app";

const Account = () => {
  const [admin, setAdmin] = useState<AdminType | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);

  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { admin: AdminType }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/auth/me`,
            { withCredentials: true }
          );

          if (res.data.status === "ok" && res.data.admin) {
            setName(res.data.admin.name);
            setUsername(res.data.admin.username);
            setPhoneNo(res.data.admin.phoneNo || "");
            setEmail(res.data.admin.email || "");
            setAddress(res.data.admin.address || "");
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
            message: "failed to load admin info",
          });
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const handleInfoSubmit = async () => {
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      username.trim() === "" ||
      phoneNo.trim() === "" ||
      email.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }
    try {
      setLoading(true);
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/account/update`,
        {
          name,
          address,
          username,
          phoneNo,
          email,
        },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(res);
      if (res.data.status === "ok") {
        setAlert({ type: "message", message: res.data.message });
      } else {
        setAlert({ type: "error", message: res.data.message });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update admin",
      });
    }
  };

  const handlePasswordSubmit = async () => {
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

    if (confirmPass !== newPass) {
      return setAlert({
        type: "error",
        message: "confirm password did not match",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/account/passwordUpdate`,
        {
          oldPass,
          newPass,
        },
        { withCredentials: true }
      );
      setLoading(false);
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
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "error trying to update password",
      });
    }
  };
  return (
    <AdminLayout>
      <h1>Account's Settings</h1>
      <div className={styles.addAccounts}>
        <div className={styles.title}>Add Accounts</div>
        <div className={styles.content}>
          <div className={styles.subTitle}>
            You can add sub admin accounts and give them permissions accordingly
          </div>
          <div className={styles.actBtn}>
            <Button
              onClick={() => {
                Router.push("/admin/account/addAccount");
              }}
              disable={loading}
            >
              Add an Account
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "20px",
          width: "40%",
        }}
      >
        <IntputField label="Name" value={name} setState={setName} />
        <IntputField label="Address" value={address} setState={setAddress} />
        <IntputField label="Username" value={username} setState={setUsername} />
        <IntputField label="Phone No." value={phoneNo} setState={setPhoneNo} />
        <IntputField label="Email" value={email} setState={setEmail} />
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Button onClick={handleInfoSubmit} disable={loading}>
            Save
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "20px",
        }}
      >
        <h2
          style={{
            color: "var(--theme-color)",
          }}
        >
          Password Change
        </h2>
        <div
          style={{
            width: "40%",
          }}
        >
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
          <Button disable={loading} onClick={handlePasswordSubmit}>
            Save
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Account;
