import Router from "next/router";
import React, { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";

const ChangeEmail = () => {
  const [page, setPage] = useState<1 | 2>(1);

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
                <IntputField label="New Email" />
              </div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Button onClick={() => setPage(2)}>
                  Send Verification Email
                </Button>
              </div>
            </div>
          )}
          {page === 2 && (
            <div>
              <div>
                <IntputField label="Verification Code" />
              </div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Button onClick={() => Router.push("/settings")}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChangeEmail;
