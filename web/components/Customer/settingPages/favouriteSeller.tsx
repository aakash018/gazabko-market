import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Seller } from "../../../@types/global";
import { useAlert } from "../../../pages/_app";

import styles from "../../../styles/components/Customer/FavouriteSeller.module.scss";

interface followedSellerType {
  userId: number;
  sellerId: number;
  seller: Seller;
}
interface Props {
  followedSeller: followedSellerType;
  setFollowingList: React.Dispatch<React.SetStateAction<followedSellerType[]>>;
}

const StoreHolder: React.FC<Props> = ({ followedSeller, setFollowingList }) => {
  const { setAlert } = useAlert();

  const handleUnfollow = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/unfollowSeller`,
        { sid: followedSeller.sellerId },
        { withCredentials: true }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setFollowingList((prev) =>
          prev.filter((seller) => seller.sellerId !== followedSeller.sellerId)
        );
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "error trying to follow user",
      });
    }
  };

  return (
    <div className={styles.storeHolder}>
      <div className={styles.storeInfo}>
        <div className={styles.logo}>
          <Image
            src={"/images/brand.png"}
            width={100}
            height={100}
            objectFit="cover"
          />
        </div>
        <div className={styles.name}>{followedSeller.seller.storeName}</div>
      </div>
      <div className={styles.options}>
        <span
          style={{
            color: "var(--default-red)",
            cursor: "pointer",
          }}
          onClick={handleUnfollow}
        >
          Unfollow
        </span>
        <span>|</span>
        <span
          style={{
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
          onClick={() => Router.push(`/sellerInfo/${followedSeller.sellerId}`)}
        >
          Visit Store
        </span>
      </div>
    </div>
  );
};
const FavouriteSeller = () => {
  const { setAlert } = useAlert();
  const [followingList, setFollowingList] = useState<followedSellerType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & {
              sellers?: followedSellerType[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/getFollowingList`,
            { withCredentials: true }
          );
          console.log(res.data);
          setLoading(false);
          if (res.data.status === "ok" && res.data.sellers) {
            setFollowingList(res.data.sellers);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to find following sellers",
          });
        }
      })();
    }
  }, []);
  return (
    <div className={styles.favouriteSeller}>
      <div className={styles.favSellerHolder}>
        {loading && <h2>Loading...</h2>}
        {!loading && followingList.length === 0 && (
          <h2>No Favorite seller found</h2>
        )}
        {!loading &&
          followingList.length !== 0 &&
          followingList.map((following, i) => (
            <StoreHolder
              followedSeller={following}
              key={i}
              setFollowingList={setFollowingList}
            />
          ))}
        {/* <Button look="outlined">Load More</Button> */}
      </div>
    </div>
  );
};

//UwU

export default FavouriteSeller;
