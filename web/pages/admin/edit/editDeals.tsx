import React, { useRef } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import IntputField from "../../../components/shared/Input";
import SliderButton from "../../../components/shared/SliderButton";

import styles from "../../../styles/components/Admin/pages/EditDeals.module.scss";

const EditDeals: React.FC = () => {
  const offerNameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const discountRate = useRef<HTMLInputElement>(null);

  return (
    <AdminLayout>
      <h1>Edit Deals</h1>
      <div className={styles.editDeals}>
        <div className={styles.dealsNav}>
          <ul>
            <li>Today's Sale</li>
            <li>Dashain Deals</li>
            <li>11.11 Sales</li>
            <li>Nobember Sales</li>
          </ul>
        </div>
        <div className={styles.dealsEdit}>
          <form>
            <IntputField label="Offer's Name" input={offerNameRef} />
            <IntputField
              label="Starting Date"
              input={startDateRef}
              type="date"
            />
            <IntputField label="Ending Date" input={endDateRef} type="date" />
            <div className={styles.onOffOptions}>
              <span>Show on homepage</span>
              <SliderButton />
            </div>
            <div className={styles.onOffOptions}>
              <span>Common Discount Rate</span>
              <SliderButton />
            </div>
            <div className={styles.note}>
              Note: All The products listed within will have common discount
              rate
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditDeals;
