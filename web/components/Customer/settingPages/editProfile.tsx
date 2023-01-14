import axios from "axios";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/User";
import { avatarsData, AvaterSelectHolder } from "../../../pages/signup";
import { useAlert } from "../../../pages/_app";

import styles from "../../../styles/components/Customer/EditProfilePage.module.scss";
import Button from "../../shared/Button";
import IntputField from "../../shared/Input";

const EditProfile = () => {
  const { login, user, setUser } = useAuth();
  const { setAlert } = useAlert();
  const [selectedAvaatar, setSelectedAvatar] = useState<string>("");

  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setlastName] = useState(user?.lastName);
  const [genderSelect, setGenderSelect] = useState(user?.gender);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [selectAvaarList, setSelectAvatarList] = useState(() =>
    avatarsData.map((data) => {
      if (data.imgUrl === user?.avatar) {
        return true;
      } else {
        return false;
      }
    })
  );

  const handleInfoUpdate = async () => {
    if (
      username?.trim() === "" ||
      firstName?.trim() === "" ||
      lastName?.trim() === "" ||
      genderSelect?.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    try {
      const res = await axios.post<RespondType & { user?: User }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/update/profile`,
        {
          username,
          firstName,
          lastName,
          gender: genderSelect,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.status === "ok" && setUser && res.data.user) {
        setUser(res.data.user);
        setAlert({
          type: "message",
          message: "user updated",
        });
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update user",
      });
    }
  };

  const handleAvatarUpdate = async () => {
    try {
      if (
        user &&
        selectedAvaatar.trim() !== "" &&
        selectedAvaatar !== user.avatar
      ) {
        const res = await axios.post<RespondType>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/update/avatar`,
          {
            imgURL: selectedAvaatar,
            id: user.id,
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
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update avatar",
      });
    }
  };

  const handlePasswordUpdate = async () => {
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
        message: "confirm password did not match",
      });
    }

    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/update/password`,
        {
          newPass,
          oldPass,
        },
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setOldPass("");
        setNewPass("");
        setConfirmPass("");
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
    <div className={styles.editProfile}>
      <h2>Edit Profile</h2>
      <div className={styles.chooseAvatar}>
        <div className={styles.avatarSelect}>
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
            <Button onClick={handleAvatarUpdate}>Save</Button>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="Username"
            value={username}
            setState={setUsername}
          />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="First Name"
            value={firstName}
            setState={setFirstName}
          />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="Last Name"
            value={lastName}
            setState={setlastName}
          />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <section
            style={{
              fontSize: "1.3rem",
            }}
          >
            Email
          </section>
          <section
            style={{
              display: "flex",
              gap: "20px",

              fontSize: "1.3rem",
            }}
          >
            <span>ran*****@gmail.com</span>
            <span>|</span>
            <span
              style={{
                color: "var(--theme-color)",
                cursor: "pointer",
              }}
              onClick={() => Router.push("/settings/changeEmail")}
            >
              Change
            </span>
          </section>
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="Birth Date" type={"date"} />
        </div>
        <select
          defaultValue={genderSelect}
          onChange={(e) => setGenderSelect(e.target.value as any)}
        >
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
          <option value={"others"}>Others</option>
        </select>
      </div>
      <Button className={styles.actBtn} onClick={handleInfoUpdate}>
        Save Changes
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h2>Change Password</h2>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="Old Password"
            type={"password"}
            setState={setOldPass}
            value={oldPass}
          />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="New Password"
            type={"password"}
            setState={setNewPass}
            value={newPass}
          />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField
            label="Confirm Password"
            type={"password"}
            setState={setConfirmPass}
            value={confirmPass}
          />
        </div>
        <Button className={styles.actBtn} onClick={handlePasswordUpdate}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
