import Image from "next/image";
import React from "react";

import styles from "../../../styles/components/shared/Admin/PendingSellerVefHolder.module.scss";
import Button from "../../shared/Button";

interface Props {
  storeName: string;
  address: string;
  personName: string;
  phoneNo: string;
  panNo: string | "N/A";
  email: string | "N/A";
  onVerifyRequest: () => void;
  onUpdateVerifyRequest: () => {};
  toUpdate: boolean;
}

const PendingSellerVefHolder: React.FC<Props> = ({
  address,
  email,
  panNo,
  personName,
  phoneNo,
  storeName,
  onVerifyRequest,
  onUpdateVerifyRequest,
  toUpdate,
}) => {
  return (
    <div className={styles.pendingSellerVefHolder}>
      <div className={styles.profileImg}>
        <Image
          src={"/images/brand.png"}
          width={200}
          height={200}
          objectFit="cover"
        />
      </div>
      <div className={styles.info}>
        {toUpdate && (
          <div className={styles.infoHolder}>
            <div
              className={styles.title}
              style={{ color: "var(--default-red)" }}
            >
              This is a seller info update request
            </div>
          </div>
        )}
        <div className={styles.infoHolder}>
          <div className={styles.title}>Name</div>
          <div className={styles.mainInfo}>{storeName}</div>
        </div>
        <div className={styles.infoHolder}>
          <div className={styles.title}>Address</div>
          <div className={styles.mainInfo}>{address}</div>
        </div>

        <div className={styles.infoHolder}>
          <div className={styles.title}>Contact Person</div>
          <div className={styles.mainInfo}>{personName}</div>
        </div>
        <div className={styles.infoHolder}>
          <div className={styles.title}>Phone No.</div>
          <div className={styles.mainInfo}>{phoneNo}</div>
        </div>
        <div className={styles.infoHolder}>
          <div className={styles.title}>PAN No.</div>
          <div className={styles.mainInfo}>{panNo}</div>
        </div>
        <div className={styles.infoHolder}>
          <div className={styles.title}>Email</div>
          <div className={styles.mainInfo}>{email}</div>
        </div>

        <div className={styles.actBtn}>
          <Button onClick={toUpdate ? onUpdateVerifyRequest : onVerifyRequest}>
            {toUpdate ? "Verify Update" : "Verify"}
          </Button>
          <Button color="error">Dismiss</Button>
        </div>
      </div>
    </div>
  );
};

export default PendingSellerVefHolder;
