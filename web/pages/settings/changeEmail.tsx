import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";
import { useAlert } from "../_app";

const ChangeEmail = () => {
  const [page, setPage] = useState<1 | 2>(1);
  const { setAlert } = useAlert();
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");

  const handleEmailChange = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/update/email`,
        {
          email: newEmail,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.status === "ok") {
        setPage(2);
      } else {
        setAlert({
          type: "error",
          message: "failed to send email",
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "unknown error sending verification email",
      });
    }
  };

  const verifyCodeSubmit = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/update/verifyEmail`,
        {
          code,
        },
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        Router.push("/settings");
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update email",
      });
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            width: "300px",
            boxShadow: " 0px 0px 21px -3px rgba(0, 0, 0, 0.25)",
            padding: "20px",

            margin: "40px 0",
            borderRadius: "10px",
          }}
        >
          <h2>Change Email</h2>
          <div
            style={{
              fontSize: "5.5rem",
              color: "var(--theme-color)",
            }}
          >
            <BsShieldLockFill />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            To protect your account security, we need to verify your identity.
            We will send you a verification code to yur new email.
          </div>
          {page === 1 && (
            <div>
              <div>
                <IntputField
                  label="New Email"
                  value={newEmail}
                  setState={setNewEmail}
                />
              </div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Button onClick={handleEmailChange}>
                  Send Verification Email
                </Button>
              </div>
            </div>
          )}
          {page === 2 && (
            <div>
              <div>
                <IntputField
                  label="Verification Code"
                  value={code}
                  setState={setCode}
                />
              </div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Button onClick={verifyCodeSubmit}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChangeEmail;
