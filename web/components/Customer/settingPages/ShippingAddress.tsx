import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import styles from "../../../styles/components/Customer/ShippingAddress.module.scss";
import Button from "../../shared/Button";

import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import IntputField from "../../shared/Input";
import dynamic from "next/dynamic";
import axios from "axios";
import { setDefaultResultOrder } from "dns";
import { useAlert } from "../../../pages/_app";
import { useAuth } from "../../../context/User";
import { setDatasets } from "react-chartjs-2/dist/utils";

const Map = dynamic(
  () => import("../../shared/Map"),
  { ssr: false } // This line is important. It's what prevents server-side render
);

interface AddressHolderProps {
  address: Address;
  index: number;
}

const AddressHolder: React.FC<
  { onEditClick?: () => any } & AddressHolderProps
> = ({ onEditClick, address, index }) => {
  const { user } = useAuth();
  return (
    <div className={styles.addressHolder}>
      <h4>Delivery Address {index}</h4>
      <div className={styles.edit} onClick={onEditClick}>
        Edit
      </div>
      <div className={styles.info}>
        <div
          className={styles.name}
        >{`${user?.firstName} ${user?.lastName}`}</div>
        <div className={styles.phoneNo}>{address.phoneNo}</div>
        <div className={styles.landmark}>{address.nearestLandmark}</div>
        <div className={styles.address}>{address.deliveryAddress}</div>
      </div>
    </div>
  );
};

const ShippingAddress = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isEdditing, setIsEditing] = useState(false);
  const [editingAddressId, setEdditingAddressId] = useState<number | null>(
    null
  );

  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const [nearestLandmark, setNearestLandmark] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [loadedLatLng, setLoadedLatLng] = useState<
    [number, number] | undefined
  >(undefined);

  const [laglng, setLagLng] = useState<string>("");

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { address?: Address[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/address/getAllAddress`,
        { withCredentials: true }
      );
      setLoading(false);
      if (res.data.status === "ok" && res.data.address) {
        setAddress(res.data.address);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to load address",
      });
    }
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchAddress();
    }
    return () => {
      ignore = true;
    };
  }, []);

  interface UserAddressReqType {
    phoneNo: string;
    deliveryAddress: string;
    laglng: string;
    nearestLandmark: string;
  }
  const onAddAddress = async () => {
    try {
      const payload: UserAddressReqType = {
        phoneNo: phoneNo,
        deliveryAddress,
        nearestLandmark,
        laglng: laglng,
      };
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/address/addAddress`,
        payload,
        { withCredentials: true }
      );
      if (res.data.status === "ok") {
        setIsEditModalOpen(false);
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setIsEditing(false);
        setDeliveryAddress("");
        setNearestLandmark("");
        setPhoneNo("");
        setLoadedLatLng(undefined);
        fetchAddress();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to add data",
      });
    }
  };

  const onEditAddress = async (addressID: number) => {
    try {
      const res = await axios.get<RespondType & { address?: Address }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/address/getOneAddressInfo`,
        {
          params: { addressID },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.status === "ok" && res.data.address) {
        setPhoneNo(res.data.address.phoneNo);
        setDeliveryAddress(res.data.address.deliveryAddress);
        setNearestLandmark(res.data.address.nearestLandmark);
        setLoadedLatLng([
          JSON.parse(res.data.address.latlng).lat,
          JSON.parse(res.data.address.latlng).lng,
        ]);
        setIsEditModalOpen(true);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        type: "error",
        message: "failed to load address",
      });
    }
  };

  const onEditAddressSave = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/address/editAddress`,

        {
          addressID: editingAddressId,
          phoneNo: phoneNo,
          deliveryAddress: deliveryAddress,
          nearestLandmark: nearestLandmark,
          latlng: JSON.stringify(laglng),
        },
        { withCredentials: true }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchAddress();
        setIsEditModalOpen(false);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update address",
      });
    }
  };

  const onDeleteRequest = async () => {
    try {
      const res = await axios.delete<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/address/deleteAddress`,
        {
          params: { addressID: editingAddressId },
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setIsEditModalOpen(false);
        fetchAddress();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to delete address",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isEditModalOpen}
        style={customStyles}
        onRequestClose={() => setIsEditModalOpen(false)}
        onAfterClose={() => {
          setIsEditing(false);
          setDeliveryAddress("");
          setNearestLandmark("");
          setPhoneNo("");
          setLoadedLatLng(undefined);
        }}
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
            <IntputField
              label="Phone No."
              setState={setPhoneNo}
              value={phoneNo}
            />
            <div className={styles.delivery}>
              <IntputField label="Delivery Address" value={deliveryAddress} />
              <IntputField
                label="Nearest Landmark"
                setState={setNearestLandmark}
                value={nearestLandmark}
              />
            </div>
          </div>
          <div className={styles.map}>
            <Map
              setAddress={setDeliveryAddress}
              setLatLng={setLagLng}
              lat={loadedLatLng ? loadedLatLng[0] : undefined}
              lng={loadedLatLng ? loadedLatLng[1] : undefined}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: "20px",
          }}
        >
          {!isEdditing && <Button onClick={onAddAddress}>Add</Button>}
          {isEdditing && <Button onClick={onEditAddressSave}>Save</Button>}
          {isEdditing && (
            <Button onClick={onDeleteRequest} color="error">
              Delete
            </Button>
          )}
          <Button color="success" onClick={() => setIsEditModalOpen(false)}>
            Cancel
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
            {loading && <h2>Loading...</h2>}
            {!loading && address.length === 0 && <h2>No addresses found</h2>}
            {!loading &&
              address.length !== 0 &&
              address.map((address, i) => (
                <AddressHolder
                  key={i}
                  index={i + 1}
                  address={address}
                  onEditClick={() => {
                    setEdditingAddressId(address.id);
                    onEditAddress(address.id);
                    setIsEditing(true);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
