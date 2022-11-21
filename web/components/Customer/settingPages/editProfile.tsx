import Router from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../../context/User";
import { avatarsData, AvaterSelectHolder } from "../../../pages/signup";

import styles from "../../../styles/components/Customer/EditProfilePage.module.scss";
import Button from "../../shared/Button";
import IntputField from "../../shared/Input";

const EditProfile = () => {
  const { login } = useAuth();

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
      </div>
      <div className={styles.form}>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="Username" />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="First Name" />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="Last Name" />
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
        <select>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <Button className={styles.actBtn}>Save Changes</Button>
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
          <IntputField label="Old Password" type={"password"} />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="New Password" type={"password"} />
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <IntputField label="Confirm Password" type={"password"} />
        </div>
        <Button className={styles.actBtn}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditProfile;
