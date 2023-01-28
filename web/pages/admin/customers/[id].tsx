import axios from "axios";
import { readSync } from "fs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";

import styles from "../../../styles/components/Admin/pages/CustomerInfoPage.module.scss";
import { sleep } from "../../../utils/sleep";
import { useAlert } from "../../_app";

const Map = dynamic(
  () => import("../../../components/shared/Map"), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
);

const CustomerInfoPage = () => {
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const router = useRouter();
  const { id, uid } = router.query;

  const [banLoading, setBanLoading] = useState(false);

  const fetchData = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { user?: User }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/customers/getOneCustomerInfo`,
        {
          params: { uid },
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "ok" && res.data.user) {
        setCustomer(res.data.user);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to load user info",
      });
    }
  };

  useEffect(() => {
    let ignore = false;

    fetchData();
    return () => {
      ignore = true;
    };
  }, [uid]);

  const handleBanUser = async () => {
    try {
      setBanLoading(true);
      await sleep(2000);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/customers/banCustomer`,
        {
          uid,
        },
        { withCredentials: true }
      );
      setBanLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchData();
      } else {
        setAlert({
          type: "message",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "message",
        message: "failed to ban user",
      });
    }
  };
  const handlUnbanUser = async () => {
    try {
      setBanLoading(true);
      await sleep(2000);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/customers/unBanCustomer`,
        {
          uid,
        },
        { withCredentials: true }
      );
      setBanLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchData();
      } else {
        setAlert({
          type: "message",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "message",
        message: "failed to ban user",
      });
    }
  };

  return (
    <AdminLayout>
      <div className={styles.customerInfoWrapper}>
        {loading && <h2>Loading...</h2>}
        {!loading && customer && (
          <div className={styles.customerInfo}>
            <div className={styles.info}>
              <div className={styles.title}>Customer’s Profile</div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>ID: </div>
                  <div className={styles.infoContent}>{customer.id}</div>
                </div>{" "}
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>First Name: </div>
                  <div className={styles.infoContent}>{customer.firstName}</div>
                </div>{" "}
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Last Name: </div>
                  <div className={styles.infoContent}>{customer.lastName}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Email: </div>
                  <div className={styles.infoContent}>{customer.email}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Phone: </div>
                  <div className={styles.infoContent}>{customer.phoneNo}</div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Delivery Address: </div>
                  <div className={styles.infoContent}>
                    {customer.address[0].deliveryAddress}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Nearest Landmark: </div>
                  <div className={styles.infoContent}>
                    {customer.address[0].nearestLandmark}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Total Items Bought: </div>
                  <div className={styles.infoContent}>
                    {customer.totalItemsBought}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Total money spent: </div>
                  <div className={styles.infoContent}>35,587</div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Joined Date: </div>
                  <div className={styles.infoContent}>
                    {customer.created_at}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>
                    Total Reviews Written:{" "}
                  </div>
                  <div className={styles.infoContent}>
                    {(customer as any).reviewCount}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>
                    Total Reports Written:{" "}
                  </div>
                  <div className={styles.infoContent}>2</div>
                </div>
              </div>
              <div className={styles.actBtn}>
                {/* <Button>Verify</Button> */}
                {!customer.isBanned && (
                  <Button
                    color="error"
                    onClick={handleBanUser}
                    disable={banLoading}
                  >
                    {banLoading ? "Loading..." : "Ban User"}
                  </Button>
                )}
                {customer.isBanned && (
                  <Button
                    color="default"
                    onClick={handlUnbanUser}
                    disable={banLoading}
                  >
                    {banLoading ? "Loading..." : "Unban User"}
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.avatar}>
                <Image src={customer.avatar} width={250} height={250} />
              </div>
              <div className={styles.map}>
                <Map
                  setAddress={setAddress}
                  lat={JSON.parse(customer.address[0].latlng).lat}
                  lng={JSON.parse(customer.address[0].latlng).lng}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CustomerInfoPage;
