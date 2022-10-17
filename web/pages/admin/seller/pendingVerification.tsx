import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import PendingSellerVefHolder from "../../../components/Admin/shared/PendingSellerVefHolder";

import styles from "../../../styles/components/Admin/pages/PendingSellerVerification.module.scss";

const PendingVerification = () => {
  return (
    <AdminLayout>
      <h1>Pending Verification</h1>
      <div className={styles.pendingVef}>
        <div className={styles.storeInfo}>
          <PendingSellerVefHolder
            address="123 Street Kaathmandu"
            storeName="Laxmi Store"
            email="random@gmail.com"
            panNo={"N/A"}
            personName="Hari Bhatarai"
            phoneNo={9862354789}
          />
          <PendingSellerVefHolder
            address="123 Street Kaathmandu"
            storeName="Laxmi Store"
            email="random@gmail.com"
            panNo={"N/A"}
            personName="Hari Bhatarai"
            phoneNo={9862354789}
          />
          <PendingSellerVefHolder
            address="123 Street Kaathmandu"
            storeName="Laxmi Store"
            email="random@gmail.com"
            panNo={"N/A"}
            personName="Hari Bhatarai"
            phoneNo={9862354789}
          />
          <PendingSellerVefHolder
            address="123 Street Kaathmandu"
            storeName="Laxmi Store"
            email="random@gmail.com"
            panNo={"N/A"}
            personName="Hari Bhatarai"
            phoneNo={9862354789}
          />
          <PendingSellerVefHolder
            address="123 Street Kaathmandu"
            storeName="Laxmi Store"
            email="random@gmail.com"
            panNo={"N/A"}
            personName="Hari Bhatarai"
            phoneNo={9862354789}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PendingVerification;
