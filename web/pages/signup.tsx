import dynamic from "next/dynamic";
import Router from "next/router";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import SignUpLayout from "../components/shared/Customer/SignUpLayout";
import Input from "../components/shared/Input";
import { useAuth } from "../context/User";

import styles from "../styles/components/Customer/pages/signup.module.scss";
import axios from "axios";
import { useAlert } from "./_app";
const Map = dynamic(
  () => import("../components/shared/Map"), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
);

interface AvaterSelectorProps {
  imgURL: string;
  width?: number;
  height?: number;
  select?: boolean;
  onClick?: () => void;
}

export const AvaterSelectHolder: React.FC<AvaterSelectorProps> = ({
  imgURL,
  width = 70,
  height = 70,
  select = false,
  onClick,
}) => {
  return (
    <div
      className={`${styles.avatarSelectHolder} ${select ? "selected" : ""}`}
      onClick={onClick}
    >
      <Image src={imgURL} width={width} height={height} objectFit="cover" />
    </div>
  );
};

export const avatarsData = [
  {
    imgUrl: "/images/avatar.jpg",
    width: 70,
    height: 70,
  },
  {
    imgUrl: "/images/avatar2.png",
    width: 70,
    height: 70,
  },
  {
    imgUrl: "/images/avater3.png",
    width: 70,
    height: 70,
  },
  {
    imgUrl: "/images/avatar4.png",
    width: 60,
    height: 60,
  },
  {
    imgUrl: "/images/avatar5.png",
    width: 60,
    height: 60,
  },
];

const SignUpPage: React.FC = () => {
  const { login } = useAuth();
  const { setAlert } = useAlert();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const phone = useRef<HTMLInputElement>(null);
  const code = useRef<HTMLInputElement>(null);

  const handlePageInc = () => {
    if (page >= 4) return;
    setPage((prev) => prev + 1);
  };

  const handlePageDce = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  };

  const onSubmit = async () => {
    if (password !== cpassword) {
      return setAlert({
        type: "error",
        message: "Confirm Password didn't match!",
      });
    }

    const payload = {
      firstName,
      lastName,
      username,
      password,
      email,
    };

    const response = await axios.post(
      "http://localhost:5000/auth/signup",
      payload
    );
    console.log(response);

    handlePageInc();
  };

  const [showFooter, setShowFooter] = useState(false);

  const [page, setPage] = useState<number>(0);

  const [delivaryAdd, setDeleveryAdd] = useState("");

  const [selectedAvaatar, setSelectedAvatar] = useState(0);
  const [selectAvaarList, setSelectAvatarList] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (page === 0) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, [page]);

  return (
    <Layout showFooter={false}>
      <div className={styles.signupWrapper}>
        <SignUpLayout showFooter={showFooter} clean={page === 3 || page === 4}>
          {page === 0 && (
            <div className={styles.formInput}>
              <form>
                <Input setState={setFirstName} placeholder="First Name" />
                <Input setState={setLastName} placeholder="Last Name" />
                <Input setState={setUsername} placeholder="Username" />

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
                  setState={setPassword}
                  placeholder="Password"
                  type={"password"}
                />
                <Input
                  setState={setCPassword}
                  placeholder="Confirm Password"
                  type={"password"}
                />
                <select>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                <Input input={phone} placeholder="Phone No." type={"number"} />
                <Input setState={setEmail} placeholder="Email" type={"email"} />
                <div className={styles.actionBtn}>
                  <Button onClick={handlePageDce} color="error">
                    BACK
                  </Button>
                  <Button onClick={onSubmit}>NEXT</Button>
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

                <Button onClick={handlePageInc}>NEXT</Button>
              </form>
            </div>
          )}
          {page === 4 && (
            <div className={styles.avatarSelect}>
              <h1>We are almost done !!</h1>
              <h2>Choose Your Avatar</h2>
              <div className={styles.avatars}>
                {avatarsData.map((avatar, i) => (
                  <AvaterSelectHolder
                    imgURL={avatar.imgUrl}
                    width={avatar.width}
                    height={avatar.height}
                    select={selectAvaarList[i]}
                    onClick={() => {
                      // ? TO SELECT AVATAR
                      // ? FIRST UNSELECT THE SELECTED AVATAR
                      setSelectAvatarList([false, false, false, false, false]);

                      // ? THEN set TRUE to the one avatar clicked
                      setSelectAvatarList((prev) =>
                        prev.map((ele, j) => {
                          if (j === i) return true;
                          else return false;
                        })
                      );
                    }}
                  />
                ))}
              </div>
              <div className={styles.actBtn}>
                <Button
                  onClick={() => {
                    login();
                    Router.push("/");
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </SignUpLayout>
      </div>
    </Layout>
  );
};

export default SignUpPage;
