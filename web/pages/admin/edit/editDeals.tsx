import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";
import SliderButton from "../../../components/shared/SliderButton";

import Modal from "react-modal";

import styles from "../../../styles/components/Admin/pages/EditDeals.module.scss";
import { customStyles } from "../../../modalStyle";
import AddNewDealsModal, {
  OfferAddPayloadType,
} from "../../../components/Admin/AddNewDealsModal";
import axios from "axios";
import { OfferType } from "../../../@types/global";
import { useAlert } from "../../_app";
import { type } from "os";
import TagsSelector from "../../../components/shared/TagsSelector";
import DialogBox from "../../../components/shared/DialogBox";

const EditDeals: React.FC = () => {
  const [offerName, setOfferName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [discountRate, setDiscountRate] = useState<string>("");
  const [isCommonDisRate, setIsCommonDisRate] = useState(false);
  const [showOnHomepage, setShowOnHomepage] = useState(false);

  const [openAddDeals, setOPenAddDeals] = useState(false);
  const [products, setProducts] = useState<string[]>([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { setAlert } = useAlert();

  const fetchOffers = async () => {
    try {
      setPageLoading(true);
      const res = await axios.get<RespondType & { offers?: OfferType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/offers/getOffers`,
        { withCredentials: true }
      );
      setPageLoading(false);
      console.log(res.data);
      if (res.data.status === "ok" && res.data.offers) {
        setOffers(res.data.offers);
        setSelectedOffer(res.data.offers[0]);
        setOfferName(res.data.offers[0].name);
        setStartDate(res.data.offers[0].starting_date);
        setEndDate(res.data.offers[0].ending_date);
        setIsCommonDisRate(res.data.offers[0].common_discount);
        setDiscountRate((res.data.offers[0].discount as any) || "");
        setShowOnHomepage(res.data.offers[0].show_on_homepage);

        const productsName = res.data.offers[0].products?.map(
          (product) => product.name
        );

        setProducts(productsName as string[]);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setPageLoading(false);
      setAlert({
        type: "error",
        message: "failed to load offers",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchOffers();
    }

    return () => {
      ignore = false;
    };
  }, []);

  const handleChangeOffers = (id: string) => {
    //? offer will be a list with only one needed offer at  index 0
    const offer = offers.filter((offer) => offer.id === id);

    setSelectedOffer(offer[0]);
    setOfferName(offer[0].name);
    setStartDate(offer[0].starting_date);
    setEndDate(offer[0].ending_date);
    setIsCommonDisRate(offer[0].common_discount);
    setDiscountRate((offer[0].discount as any) || "");
    setShowOnHomepage(offer[0].show_on_homepage);

    const productsName = offer[0].products?.map((product) => product.name);

    setProducts(productsName as string[]);
  };

  const handleDeleteOffer = async () => {
    try {
      const res = await axios.delete<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/offers/deleteOffer`,
        { params: { offerID: selectedOffer?.id }, withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });

        setIsDeleteModalOpen(false);
        fetchOffers();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to delete offer",
      });
    }
  };

  const handleUpdateSubmit = async () => {
    const payload = {
      id: selectedOffer?.id,
      name: offerName,
      common_discount: isCommonDisRate,
      discount: parseInt(discountRate),
      endingDate: endDate as Date,
      startingDate: startDate as Date,
      show_on_homepage: showOnHomepage,
    };

    if (offerName.trim() === "" || startDate === null || endDate === null) {
      return setAlert({
        type: "error",
        message: "empty fiends",
      });
    }

    if (
      new Date(startDate).toDateString() === new Date(endDate).toDateString()
    ) {
      return setAlert({
        type: "error",
        message: "starting date can't be same  as ending date",
      });
    }

    if (
      isCommonDisRate &&
      (discountRate as unknown as number).toString().trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "discount rate must be provided if common discount",
      });
    }

    try {
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/offers/updateOffer`,
        payload,
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchOffers();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to update offer",
      });
    }
  };

  const addProducts = async (input: string) => {
    try {
      const res = await axios.post<RespondType & { productName: string }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/offers/addProducts`,
        {
          pSKU: input,
          offerID: selectedOffer?.id,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.status === "ok") {
        setProducts((prev) => prev.concat(res.data.productName));
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to add product",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        style={customStyles}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogBox title="Confirm Delete">
          <div className={"confirmModal"}>
            <div className={"content"}>
              Do you really want to delete the offer?
            </div>
            <div className={"actBtn"}>
              <Button onClick={handleDeleteOffer}>Yes</Button>
              <Button color="error" onClick={() => setIsDeleteModalOpen(false)}>
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <Modal
        isOpen={openAddDeals}
        style={customStyles}
        onRequestClose={() => {
          setOPenAddDeals(false);
        }}
      >
        <AddNewDealsModal
          onSaveClick={() => {
            setOPenAddDeals(false);
            fetchOffers();
          }}
        />
      </Modal>
      <AdminLayout>
        <h1>Edit Deals</h1>
        <div className={styles.editDeals}>
          <div className={styles.dealsNav}>
            {pageLoading && <h2>Loading...</h2>}
            {!pageLoading && selectedOffer && (
              <ul>
                {offers.map((offer, i) => (
                  <li
                    key={i}
                    style={{
                      color: `${
                        offer.id === selectedOffer.id
                          ? "var(--theme-color)"
                          : "black"
                      }`,
                    }}
                    onClick={() => handleChangeOffers(offer.id)}
                  >
                    {offer.name}
                  </li>
                ))}
              </ul>
            )}
            <Button onClick={() => setOPenAddDeals(true)}>Add New Deals</Button>
          </div>
          <div className={styles.dealsEdit}>
            {selectedOffer !== null && (
              <form>
                <IntputField
                  label="Offer's Name"
                  value={offerName}
                  setState={setOfferName}
                />
                <IntputField
                  label="Starting Date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={
                    new Date(startDate as Date).toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setStartDate(e.target.valueAsDate);
                  }}
                />
                <IntputField
                  label="Ending Date"
                  type="date"
                  min={
                    new Date(new Date(startDate as Date))
                      .toISOString()
                      .split("T")[0]
                  }
                  value={new Date(endDate as Date).toISOString().split("T")[0]}
                  onChange={(e) => {
                    setEndDate(e.target.valueAsDate);
                  }}
                />
                <div className={styles.onOffOptions}>
                  <span>Show on homepage</span>
                  <SliderButton
                    originState={showOnHomepage}
                    setState={setShowOnHomepage}
                  />
                </div>
                <div>
                  <div className={styles.onOffOptions}>
                    <span>Common Discount Rate</span>
                    <SliderButton
                      originState={isCommonDisRate}
                      setState={setIsCommonDisRate}
                    />
                  </div>
                  <div className={styles.note}>
                    Note: All The products listed within will have common
                    discount rate
                  </div>
                </div>
                <IntputField
                  label="Discount Rate"
                  value={discountRate || ""}
                  setState={setDiscountRate}
                  type={"number"}
                />
                <Button onClick={handleUpdateSubmit}>Save</Button>
                <div>
                  <TagsSelector
                    label="Add Products by SKU number"
                    listState={products}
                    setListState={setProducts}
                    onSaveRequest={addProducts}
                  />
                </div>
                <div className={styles.deleteOffer}>
                  <div className={styles.title}>Delete this offer</div>
                  <div className={styles.note}>
                    This offer will be no longer shown on homepage and all
                    products within will be removed from the offer. This process
                    is irreversible.
                  </div>
                  <Button
                    color="error"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditDeals;
