import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

import styles from "../../../styles/components/Customer/ShippingAddress.module.scss";
import Button from "../../shared/Button";

import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import IntputField from "../../shared/Input";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("../../shared/Map"),
  { ssr: false } // This line is important. It's what prevents server-side render
);

const AddressHolder: React.FC<{ onEditClick?: () => void }> = ({
  onEditClick,
}) => {
  return (
    <div className={styles.addressHolder}>
      <h4>Delivery Address 1</h4>
      <div className={styles.edit} onClick={onEditClick}>
        Edit
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Laxmi Bhattarai</div>
        <div className={styles.phoneNo}>9862930464</div>
        <div className={styles.landmark}>NMB Bank</div>
        <div className={styles.address}>
          Bagmati Province,Kathmandu Outside Ring Road,Chandragiri - Kalanki
          Area,Kalanki
        </div>
      </div>
    </div>
  );
};

const ShippingAddress = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isEditModalOpen}
        style={customStyles}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <h3
          style={{
            marginBottom: 30,
          }}
        >
          Edit Address
        </h3>
        <div className={styles.editAddressModal}>
          <div className={styles.input}>
            <IntputField label="Full Name" />
            <IntputField label="Phone No." />
            <div className={styles.delivery}>
              <IntputField label="Delivery Address" value={deliveryAddress} />
              <IntputField label="Nearest Landmark" />
            </div>
          </div>
          <div className={styles.map}>
            <Map setAddress={setDeliveryAddress} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: "20px",
          }}
        >
          <Button onClick={() => setIsEditModalOpen(false)}>Save</Button>
          <Button color="error" onClick={() => setIsEditModalOpen(false)}>
            Cancle
          </Button>
        </div>
      </Modal>
      <div className={styles.shippingAddress}>
        <div className={styles.actBtn}>
          <Button
            color="success"
            look="blank"
            onClick={() => setIsEditModalOpen(true)}
          >
            <span>
              <MdAdd />
            </span>
            <span>Add Address</span>
          </Button>
        </div>
        <div className={styles.addresses}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              marginLeft: 50,
            }}
          >
            <AddressHolder onEditClick={() => setIsEditModalOpen(true)} />
            <AddressHolder onEditClick={() => setIsEditModalOpen(true)} />
            <AddressHolder onEditClick={() => setIsEditModalOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
