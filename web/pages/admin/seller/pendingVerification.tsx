import axios from "axios";
import React, { useEffect, useState } from "react";
import { Seller, ToBeVerifiedType } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
import PendingSellerVefHolder from "../../../components/Admin/shared/PendingSellerVefHolder";

import styles from "../../../styles/components/Admin/pages/PendingSellerVerification.module.scss";
import { useAlert } from "../../_app";

const PendingVerification = () => {
  const [loading, setLoading] = useState(false);

  const [pendingVerifications, setPendingVerifications] = useState<
    ToBeVerifiedType[]
  >([]);

  const { setAlert } = useAlert();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<
        RespondType & { pendingSellers?: ToBeVerifiedType[] }
      >(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/getPendingSellers`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (res.data.status === "ok" && res.data.pendingSellers) {
        setPendingVerifications(res.data.pendingSellers);
        console.log(res.data);
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

  const handleVerifySeller = async (sid: string) => {
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

  const handleUpdateVerifySeller = async (sid: string, vid: string) => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/verifyUpdateSeller`,
        {
          sid,
          verificationReqId: vid,
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
            {pendingVerifications.map((pendingVerification, i) => (
              <PendingSellerVefHolder
                onUpdateVerifyRequest={() =>
                  handleUpdateVerifySeller(
                    pendingVerification.sellerID,
                    pendingVerification.id
                  )
                }
                toUpdate={pendingVerification.toUpdate}
                onVerifyRequest={() =>
                  handleVerifySeller(pendingVerification.sellerID)
                }
                key={i}
                address={pendingVerification.storeAddress}
                storeName={pendingVerification.storeName}
                email={
                  pendingVerification.email === ""
                    ? "N/A"
                    : pendingVerification.email
                }
                panNo={
                  pendingVerification.panNo === ""
                    ? "N/A"
                    : pendingVerification.panNo
                }
                personName={pendingVerification.contactPerson}
                phoneNo={pendingVerification.phoneNo}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PendingVerification;
