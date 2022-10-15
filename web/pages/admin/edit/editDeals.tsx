import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";
import SliderButton from "../../../components/shared/SliderButton";

import Modal from "react-modal";

import styles from "../../../styles/components/Admin/pages/EditDeals.module.scss";
import { customStyles } from "../../../modalStyle";
import AddNewDealsModal from "../../../components/Admin/AddNewDealsModal";

const EditDeals: React.FC = () => {
  const offerNameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const discountRate = useRef<HTMLInputElement>(null);

  const [openAddDeals, setOPenAddDeals] = useState(false);

  return (
    <>
      <Modal
        isOpen={openAddDeals}
        style={customStyles}
        onRequestClose={() => setOPenAddDeals(false)}
      >
        <AddNewDealsModal />
      </Modal>
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
            <Button onClick={() => setOPenAddDeals(true)}>Add New Deals</Button>
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
              <div>
                <div className={styles.onOffOptions}>
                  <span>Common Discount Rate</span>
                  <SliderButton />
                </div>
                <div className={styles.note}>
                  Note: All The products listed within will have common discount
                  rate
                </div>
              </div>
              <IntputField label="Discount Rate" />
              <Button>Save</Button>
              <div className={styles.deleteOffer}>
                <div className={styles.title}>Delete this offer</div>
                <div className={styles.note}>
                  This offer will be no longer shown on homepage and all
                  products within will be removed from the offer. This process
                  is irreversible.
                </div>
                <Button color="error">Delete</Button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditDeals;
