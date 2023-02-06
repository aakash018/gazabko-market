import React, { useRef, useState } from "react";
import Button from "../shared/Button";
import IntputField from "../shared/Input";
import SliderButton from "../shared/SliderButton";

import styles from "../../styles/components/Admin/AddNewDealsModal.module.scss";
import { useAlert } from "../../pages/_app";
import axios from "axios";
export interface OfferAddPayloadType {
  name: string;
  startingDate: Date;
  endingDate: Date;
  show_on_homepage: boolean;
  common_discount: boolean;
  discount: number | null;
}

const AddNewDealsModal: React.FC<{ onSaveClick?: () => void }> = ({
  onSaveClick,
}) => {
  const offerNameRef = useRef<HTMLInputElement>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const discountRate = useRef<HTMLInputElement>(null);

  const [isCommonDisRate, setIsCommonDisRate] = useState(false);
  const [showOnHomepage, setShowOnHomepage] = useState(false);

  const { setAlert } = useAlert();

  const handelSubmit = async () => {
    if (
      offerNameRef.current?.value.trim() === "" ||
      startDate === null ||
      endDate === null
    ) {
      return setAlert({
        type: "error",
        message: "empty fiends",
      });
    }

    if (startDate.toDateString() === endDate.toDateString()) {
      return setAlert({
        type: "error",
        message: "starting date can't be same  as ending date",
      });
    }

    if (isCommonDisRate && discountRate.current?.value.trim() === "") {
      return setAlert({
        type: "error",
        message: "discount rate must be provided if common discount",
      });
    }

    const payload: OfferAddPayloadType = {
      common_discount: isCommonDisRate,
      discount: parseInt(discountRate.current!.value),
      name: offerNameRef.current!.value,
      startingDate: startDate,
      endingDate: endDate,
      show_on_homepage: showOnHomepage,
    };

    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/offers/addOffer`,
        payload,
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        if (onSaveClick) {
          onSaveClick();
        }
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to add offer",
      });
    }
  };

  return (
    <div className={styles.dealsEdit}>
      <form>
        <IntputField label="Offer's Name" input={offerNameRef} />
        <IntputField
          label="Starting Date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setStartDate(e.target.valueAsDate as Date);
          }}
        />

        {startDate && (
          <IntputField
            label="Ending Date"
            type="date"
            min={new Date(new Date(startDate)).toISOString().split("T")[0]}
            onChange={(e) => {
              setEndDate(e.target.valueAsDate);
            }}
          />
        )}
        <div className={styles.onOffOptions}>
          <span>Show on homepage</span>
          <SliderButton
            setState={setShowOnHomepage}
            originState={showOnHomepage}
          />
        </div>
        <div>
          <div className={styles.onOffOptions}>
            <span>Common Discount Rate</span>
            <SliderButton
              setState={setIsCommonDisRate}
              originState={isCommonDisRate}
            />
          </div>
          <div className={styles.note}>
            Note: All The products listed within will have common discount rate
          </div>
        </div>
        <IntputField label="Discount Rate (%)" input={discountRate} />
        <Button onClick={handelSubmit}>Save</Button>
      </form>
    </div>
  );
};

export default AddNewDealsModal;
