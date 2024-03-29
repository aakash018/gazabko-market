import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { GiBrokenHeart } from "react-icons/gi";
import { ProtuctType, Seller } from "../../@types/global";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";

import styles from "../../styles/components/Customer/pages/SellerInfoPge.module.scss";
import { sleep } from "../../utils/sleep";
import { useAlert } from "../_app";

const SellerInfoPage = () => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const [products, setproducts] = useState<ProtuctType[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);
  const router = useRouter();
  const { sid } = router.query;

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        if (!seller && sid) {
          setLoading(true);
          const res = await axios.get<RespondType & { seller?: Seller }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/getSellerInfo`,
            {
              params: {
                sid: sid,
              },
            }
          );
          if (res.data.status === "ok" && res.data.seller) {
            setSeller(res.data.seller);
            setLoading(false);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        }

        if (products.length === 0) {
          const res = await axios.get<
            RespondType & { products?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/getSellerProducts`,
            {
              params: { sid },
            }
          );
          if (res.data.status === "ok" && res.data.products) {
            setproducts(res.data.products);
          }
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [sid]);

  useEffect(() => {
    let ignore = false;
    if (!sid) return;
    try {
      (async () => {
        if (!ignore) {
          const res = await axios.get<RespondType & { isFollowed?: boolean }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/isFollowed`,
            {
              params: { sid },
              withCredentials: true,
            }
          );
          if (res.data.status === "ok") {
            setIsFollowing(res.data.isFollowed as boolean);
          }
        }
      })();
    } catch {
      setAlert({
        type: "error",
        message: "failed to get store follow info",
      });
    }
    return () => {
      ignore = true;
    };
  }, [sid]);

  useEffect(() => {
    (async () => {
      setIsFollowingLoading(true);
      await sleep(3000);
      setIsFollowingLoading(false);
    })();
  }, [isFollowing]);
  const handleFollow = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/followSeller`,
        { sid: sid },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setIsFollowing(true);
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

  const handleUnfollow = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerInfo/unfollowSeller`,
        { sid: sid },
        { withCredentials: true }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setIsFollowing(false);
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
    <Layout>
      {loading && <h2>Loading...</h2>}
      {!loading && seller && (
        <div className={styles.sellerInfoPage}>
          <div className={styles.sellerDataContainer}>
            <section className={styles.sellerData}>
              <section className={styles.sellerLogoContainer}>
                <section className={styles.sellerLogo}>
                  <Image
                    src="/images/brand.png"
                    objectFit="cover"
                    width={100}
                    height={100}
                  />
                </section>
              </section>
              <section className={styles.rating}>
                <FaStar size={35} />
                <span className={styles.text}>4.7</span>
              </section>
              <section className={styles.sellerInfoFields}>
                <div>
                  <section className={styles.name}>{seller.storeName}</section>
                  <section className={styles.address}>{seller.address}</section>
                  <section className={styles.email}>
                    {seller.contactPerson}
                  </section>
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    {isFollowing == null ||
                      (isFollowingLoading && (
                        <Button disable={true} color="gray">
                          Loading...
                        </Button>
                      ))}
                    {isFollowing != null && !isFollowingLoading && (
                      <Button
                        color={`${isFollowing ? "gray" : "error"}`}
                        onClick={isFollowing ? handleUnfollow : handleFollow}
                      >
                        <span>
                          {isFollowing ? <GiBrokenHeart /> : <BiHeart />}
                        </span>
                        <span>
                          {isFollowing ? "Unfollow Store" : "Follow Store"}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.productDetails}>
                  <section className={styles.totalProduct}>
                    <section className={styles.title}>Total Products</section>
                    <section className={styles.number}>
                      {seller?.productCount}
                    </section>
                  </section>
                  {/* <section className={styles.totalProduct}>
                    <section className={styles.title}>Total Items Sold</section>
                    <section className={styles.number}>13</section>
                  </section> */}
                </div>
              </section>
              <div className="line" style={{ marginTop: 30 }}></div>
            </section>
          </div>

          <div className={styles.sellerBanner}>
            <Image
              src={"/images/placeHolders/shoeBanner.jpeg"}
              width={1280}
              height={400}
              objectFit="cover"
            />
          </div>

          {products.length !== 0 && (
            <section className={styles.products}>
              <ShowCase
                title="Offered Deals"
                showTitle={true}
                products={products.slice(0, 5)}
              />
              <ShowCase
                title="Popular Items"
                showTitle={true}
                products={products.slice(2, 7)}
              />
              <ShowCase
                title="All Items"
                showTitle={true}
                products={products}
              />
            </section>
          )}
          <div style={{ alignSelf: "center", marginTop: "20px" }}>
            <Button color="error" look="outlined">
              Load More
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SellerInfoPage;
