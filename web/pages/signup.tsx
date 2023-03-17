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
import { MdVerified } from "react-icons/md";
import { setLazyProp } from "next/dist/server/api-utils";
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

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const code = useRef<HTMLInputElement>(null);
  const [delivaryAdd, setDeleveryAdd] = useState("");
  const [nearestLandmark, setNearestLandark] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | "others">("male");

  const [page, setPage] = useState<number>(0);

  const userIDforEmailVerification = useRef("");

  const [selectedAvaatar, setSelectedAvatar] = useState("/images/avatar.jpg");
  const [mapCods, setMapCods] = useState("");
  const [selectAvaarList, setSelectAvatarList] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

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

    if (password.length <= 8) {
      return setAlert({
        type: "error",
        message: "Password too short!!!",
      });
    }

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      delivaryAdd.trim() === "" ||
      nearestLandmark.trim() === "" ||
      gender.trim() === "" ||
      phone.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "Empty Fields !!!",
      });
    }

    const payload = {
      firstName,
      lastName,
      username,
      password,
      email,
      delivaryAdd,
      nearestLandmark,
      mapCods,
      gender,
      phone,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        payload
      );

      if (response.data.status !== "ok") {
        setLoading(false);
        return setAlert({
          type: "error",
          message: response.data.message,
        });
      }

      userIDforEmailVerification.current = response.data.id;
      setLoading(false);

      handlePageInc();
    } catch (e) {
      setLoading(false);
      setAlert({
        type: "error",
        message: "error doing signup",
      });
    }
  };

  const handleEmailVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/auth/verification",
        {
          id: userIDforEmailVerification.current,
          code: code.current?.value,
        }
      );
      if (response.data.status === "ok") {
        setAlert({
          type: "message",
          message: "Account Verified",
        });
        setLoading(false);
        handlePageInc();
      } else {
        setLoading(false);
        return setAlert({
          type: "error",
          message: response.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "error verifing account",
      });
      setLoading(false);
    }
  };

  const handleAvatarSet = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/update/avatar", {
        id: userIDforEmailVerification.current,
        imgURL: selectedAvaatar,
      });

      if (res.data.status !== "ok") {
        return setAlert({
          type: "error",
          message: res.data.message,
        });
        setLoading(false);
      }

      login(username, password, "customer");

      Router.push("/");
    } catch {
      setAlert({
        type: "error",
        message: "error setting avatar",
      });
      setLoading(false);
    }
  };

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
                <Input
                  setState={setFirstName}
                  placeholder="First Name"
                  value={firstName}
                />
                <Input
                  setState={setLastName}
                  placeholder="Last Name"
                  value={lastName}
                />
                <Input
                  setState={setUsername}
                  placeholder="Username"
                  value={username}
                />

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
                  value={password}
                />
                <Input
                  setState={setCPassword}
                  placeholder="Confirm Password"
                  type={"password"}
                  value={cpassword}
                />
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value as "male" | "female" | "others");
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                <Input
                  setState={setPhone}
                  placeholder="Phone No."
                  type={"number"}
                  value={phone}
                />
                <Input
                  setState={setEmail}
                  placeholder="Email"
                  type={"email"}
                  value={email}
                />
                <div className={styles.actionBtn}>
                  <Button
                    onClick={handlePageDce}
                    color="error"
                    disable={loading}
                  >
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
                <div className={styles.mapHolder}>
                  <Map setAddress={setDeleveryAdd} setLatLng={setMapCods} />
                </div>
                <Input
                  placeholder="Delivery Address"
                  type={"text"}
                  value={delivaryAdd}
                />
                <Input
                  setState={setNearestLandark}
                  placeholder="Nearest Landmark"
                  type={"text"}
                  value={nearestLandmark}
                />
                <div className={styles.actionBtn}>
                  <Button
                    onClick={handlePageDce}
                    color="error"
                    disable={loading}
                  >
                    Back
                  </Button>
                  <Button onClick={onSubmit}>NEXT</Button>
                </div>
              </form>
            </div>
          )}

          {page === 3 && (
            <div className={styles.formInput}>
              <form>
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    width: "380px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Type in the verification code we sent to your provided email
                  address
                  <div
                    style={{
                      fontSize: "6rem",
                      color: "var(--theme-color)",
                    }}
                  >
                    <MdVerified />
                  </div>
                </div>
                <Input input={code} placeholder="Code" type={"text"} />

                <Button onClick={handleEmailVerification} disable={loading}>
                  VERIFY
                </Button>
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
                      setSelectedAvatar(avatar.imgUrl);

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
                <Button onClick={handleAvatarSet} disable={loading}>
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
