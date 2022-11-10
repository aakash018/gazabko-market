import dynamic from "next/dynamic";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import SignUpLayout from "../components/shared/Customer/SignUpLayout";
import Input from "../components/shared/Input";
import { useAuth } from "../context/User";

import styles from "../styles/components/Customer/pages/signup.module.scss";
const Map = dynamic(
  () => import("../components/shared/Map"), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
);

const SignUpPage: React.FC = () => {
  const { login } = useAuth();

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const code = useRef<HTMLInputElement>(null);

  const [showFooter, setShowFooter] = useState(false);

  const [page, setPage] = useState<number>(0);

  const [delivaryAdd, setDeleveryAdd] = useState("");

  useEffect(() => {
    if (page === 0) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, [page]);

  const handlePageInc = () => {
    if (page >= 3) return;
    setPage((prev) => prev + 1);
  };

  const handlePageDce = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  };

  return (
    <Layout showFooter={false}>
      <div className={styles.signupWrapper}>
        <SignUpLayout showFooter={showFooter} clean={page === 3}>
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
                <select>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
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
                <div className={styles.mapHolder}>
                  <Map setAddress={setDeleveryAdd} />
                </div>
                <Input
                  input={code}
                  placeholder="Delivery Address"
                  type={"text"}
                  value={delivaryAdd}
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
