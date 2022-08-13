import Router from "next/router";
import React, { useRef, useState } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import SignUpLayout from "../components/shared/Customer/SignUpLayout";
import Input from "../components/shared/Input";
import { useAuth } from "../context/User";

import styles from "../styles/components/Customer/pages/signup.module.scss";

const SignUpPage: React.FC = () => {
  const { login } = useAuth();

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const code = useRef<HTMLInputElement>(null);

  const [page, setPage] = useState<number>(0);

  const handlePageInc = () => {
    if (page >= 3) return;
    setPage((prev) => prev + 1);
  };

  const handlePageDce = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  };

  return (
    <Layout sidebar="clickable">
      <div className={styles.signupWrapper}>
        <SignUpLayout>
          {page === 0 && (
            <div className={styles.formInput}>
              <form>
                <Input input={firstName} placeholder="First Name" />
                <Input input={lastName} placeholder="Last Name" />
                <Input input={username} placeholder="Username" />

                <div className={styles.terms}>
                  <input type="checkbox" name="poliecy" />
                  <span>I Agree to privacy policy & terms</span>
                </div>

                <Button onClick={handlePageInc}>NEXT</Button>
              </form>
            </div>
          )}

          {page === 1 && (
            <div className={styles.formInput}>
              <form>
                <Input
                  input={password}
                  placeholder="Password"
                  type={"password"}
                />
                <Input
                  input={cpassword}
                  placeholder="Confirm Password"
                  type={"password"}
                />
                <Input
                  input={cpassword}
                  placeholder="Phone No."
                  type={"number"}
                />
                <Input input={email} placeholder="Email" type={"email"} />
                <div className={styles.actionBtn}>
                  <Button onClick={handlePageDce} color="error">
                    BACK
                  </Button>
                  <Button onClick={handlePageInc}>NEXT</Button>
                </div>
              </form>
            </div>
          )}

          {page === 2 && (
            <div className={styles.formInput}>
              <form>
                <Input input={code} placeholder="Code" type={"text"} />

                <Button onClick={handlePageInc}>VERIFY</Button>
              </form>
            </div>
          )}

          {page === 3 && (
            <div className={styles.formInput}>
              <form>
                <Input
                  input={code}
                  placeholder="Delivery Address"
                  type={"text"}
                />
                <Input
                  input={code}
                  placeholder="Nearest Landmark"
                  type={"text"}
                />

                <Button
                  onClick={() => {
                    login();
                    Router.push("/");
                  }}
                >
                  NEXT
                </Button>
              </form>
            </div>
          )}
        </SignUpLayout>
      </div>
    </Layout>
  );
};

export default SignUpPage;
