import React, { useEffect, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";

import styles from "../../../styles/components/Seller/pages/CustomerDetails.module.scss";

import Image from "next/image";
import axios from "axios";
import { FollowerType } from "../../../@types/global";
import { useAlert } from "../../_app";
import Router, { useRouter } from "next/router";

const CustomerDetails = () => {
  const [followerInfo, setFollowerInfo] = useState<FollowerType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id, uid } = router.query;

  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { follower?: FollowerType }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/followers/getFollowerInfo`,

            {
              withCredentials: true,
              params: {
                userId: uid,
              },
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.follower) {
            setFollowerInfo(res.data.follower);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to fetch user info",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const hanldeUnfollowUser = async () => {
    try {
      const res = await axios.delete<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/followers/forceUnfollowUser`,
        {
          params: { uid },
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        Router.push("/seller/customers");
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to force unfollow user",
      });
    }
  };

  return (
    <SellerNav>
      <div className={styles.customerInfoWrapper}>
        {loading && <h2>Loading...</h2>}
        {!loading && followerInfo && (
          <div className={styles.customerInfo}>
            <div className={styles.info}>
              <div className={styles.title}>Customer’s Profile</div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Last Name: </div>
                  <div className={styles.infoContent}>
                    {followerInfo.lastName}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Status: </div>
                  <div className={styles.infoContent}>
                    {followerInfo.isVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                {/* <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Delivery Address: </div>
                  <div className={styles.infoContent}>xyz 123</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Nearest Landmark: </div>
                  <div className={styles.infoContent}>xyz 123</div>
                </div> */}
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Total Items Bought: </div>
                  <div className={styles.infoContent}>
                    {followerInfo.itemsBoughtFromStore}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Total money spent: </div>
                  <div className={styles.infoContent}>
                    {followerInfo.totalMoneySpentAtStore}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Joined Date: </div>
                  <div className={styles.infoContent}>
                    {followerInfo.joinedDate}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>
                    Total Reviews Written:{" "}
                  </div>
                  <div className={styles.infoContent}>2</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>
                    Total Reports Written:{" "}
                  </div>
                  <div className={styles.infoContent}>2</div>
                </div>
              </div>
              <div className={styles.actBtn}>
                <Button color="error" onClick={hanldeUnfollowUser}>
                  Force Unfollow User
                </Button>
              </div>
            </div>
            <div className={styles.avatar}>
              <Image src={followerInfo.avatar} width={250} height={250} />
            </div>
          </div>
        )}
      </div>
    </SellerNav>
  );
};

export default CustomerDetails;
