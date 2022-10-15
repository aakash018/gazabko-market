import React, { useRef } from "react";
import Button from "../shared/Button";
import IntputField from "../shared/Input";
import SliderButton from "../shared/SliderButton";

import styles from "../../styles/components/Admin/AddNewDealsModal.module.scss";

const AddNewDealsModal = () => {
  const offerNameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const discountRate = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.dealsEdit}>
      <form>
        <IntputField label="Offer's Name" input={offerNameRef} />
        <IntputField label="Starting Date" input={startDateRef} type="date" />
        <IntputField label="Ending Date" input={endDateRef} type="date" />
        <div className={styles.onOffOptions}>
          <span>Show on homepage</span>
          <SliderButton />
        </div>
        <div>
          <div className={styles.onOffOptions}>
            <span>Common Discount Rate</span>
            <SliderButton />
          </div>
          <div className={styles.note}>
            Note: All The products listed within will have common discount rate
          </div>
        </div>
        <IntputField label="Discount Rate" />
        <Button>Save</Button>
      </form>
    </div>
  );
};

export default AddNewDealsModal;
