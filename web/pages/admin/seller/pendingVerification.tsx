import axios from "axios";
import React, { useEffect, useState } from "react";
import { Seller } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
import PendingSellerVefHolder from "../../../components/Admin/shared/PendingSellerVefHolder";

import styles from "../../../styles/components/Admin/pages/PendingSellerVerification.module.scss";
import { useAlert } from "../../_app";

const PendingVerification = () => {
  const [loading, setLoading] = useState(false);

  const [pendingVerifications, setPendingVerifications] = useState<Seller[]>(
    []
  );

  const { setAlert } = useAlert();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { pendingSellers?: Seller[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/getPendingSellers`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (res.data.status === "ok" && res.data.pendingSellers) {
        setPendingVerifications(res.data.pendingSellers);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to retrieve pending sellers ",
      });
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const handleVerifySeller = async (sid: number) => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/verifySeller`,
        {
          sid,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.status,
        });
        fetchData();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to verify seller",
      });
    }
  };

  return (
    <AdminLayout>
      <h1>Pending Verification</h1>
      <div className={styles.pendingVef}>
        {loading && <h2>Loading...</h2>}
        {!loading && pendingVerifications.length === 0 && (
          <h2>No sellers to be verified </h2>
        )}
        {!loading && pendingVerifications.length !== 0 && (
          <div className={styles.storeInfo}>
            {pendingVerifications.map((seller, i) => (
              <PendingSellerVefHolder
                onVerifyRequest={() => handleVerifySeller(seller.id)}
                key={i}
                address={seller.address}
                storeName={seller.storeName}
                email={seller.email === "" ? "N/A" : seller.email}
                panNo={seller.panNo === "" ? "N/A" : seller.panNo}
                personName={seller.contactPerson}
                phoneNo={seller.phoneNo}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PendingVerification;
