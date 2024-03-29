import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import OrderTracker from "../../../components/shared/Customer/OrderTracker";

import Image from "next/image";
import Modal from "react-modal";

import styles from "../../../styles/components/Seller/pages/OrdersDetails.module.scss";
import { Order } from "../../../@types/global";
import axios from "axios";
import { useAlert } from "../../_app";
import DialogBox from "../../../components/shared/DialogBox";
import { customStyles } from "../../../modalStyle";

const OrdersDetails = () => {
  const router = useRouter();
  const { id, oid } = router.query;

  const [orderDetails, setOrderDetails] = useState<
    (Order & { userLastName: string }) | null
  >(null);

  const [loading, setLoading] = useState(false);
  const [verifyConfirmModal, setVerifyConfirmModal] = useState(false);
  const [cancelConfirmModal, setCancelConfirmModal] = useState(false);

  const { setAlert } = useAlert();

  const fetchOrder = async () => {
    if (oid) {
      try {
        setLoading(true);
        const res = await axios.get<
          RespondType & { order: Order; userLastName: string }
        >(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/getOneOrderInfo`,
          {
            params: { oid },
            withCredentials: true,
          }
        );

        setLoading(false);
        if (res.data.status === "ok") {
          setOrderDetails({
            ...res.data.order,
            userLastName: res.data.userLastName,
          });
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to fetch data",
        });
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [oid]);

  const handleVerifyOrder = async () => {
    try {
      setVerifyConfirmModal(false);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/verifyOrder`,
        {
          oid,
        },
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchOrder();
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
        message: "failed to verify order",
      });
    }
  };

  const handleCancelOrder = async () => {
    try {
      const res = await axios.delete<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/cancelOrder`,
        {
          params: { oid },
          withCredentials: true,
        }
      );
      console.log("YOOO", res.data);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setCancelConfirmModal(false);
        fetchOrder();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      setAlert({
        type: "error",
        message: "failed to cancel order",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={verifyConfirmModal}
        style={customStyles}
        onRequestClose={() => setVerifyConfirmModal(false)}
      >
        <DialogBox title="Hide Product">
          <div className="confirmModal">
            <div className="content">
              Are you sure want to verify this order?
            </div>
            <div className="actBtn">
              <Button onClick={handleVerifyOrder}>Yes</Button>
              <Button
                color="error"
                onClick={() => setVerifyConfirmModal(false)}
              >
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <Modal
        isOpen={cancelConfirmModal}
        style={customStyles}
        onRequestClose={() => setCancelConfirmModal(false)}
      >
        <DialogBox title="Hide Product">
          <div className="confirmModal">
            <div className="content">
              Are you sure want to cancel this order?
            </div>
            <div className="actBtn">
              <Button onClick={handleCancelOrder}>Yes</Button>
              <Button
                color="error"
                onClick={() => setCancelConfirmModal(false)}
              >
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <SellerNav>
        <h1>Order Details</h1>
        {loading && <h2>Loading...</h2>}
        {!loading && orderDetails && (
          <>
            {" "}
            <h2>Order No. {orderDetails.id}</h2>
            <div className={styles.orderDetails}>
              <div className={styles.tracker}>
                <OrderTracker
                  orderState={orderDetails.state}
                  orderStatus={orderDetails.status}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.product}>
                  <div className={styles.img}>
                    <Image
                      src={"/images/shoes2.webp"}
                      width={250}
                      height={250}
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Name</div>
                      <div className={styles.data}>
                        {orderDetails?.product?.name}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Original Product Price</div>
                      <div className={styles.data}>
                        Rs. {orderDetails?.product?.price}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>
                        Original Product Discount
                      </div>
                      <div className={styles.data}>
                        Rs. {orderDetails?.product?.discount || 0}
                      </div>
                    </div>

                    <div className={styles.infoHolder}>
                      <div className={styles.title}>
                        Total Charge For 1 Item
                      </div>
                      <div className={styles.data}>
                        Rs. {orderDetails?.product?.priceAfterDiscount}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Color: </div>
                      <div className={styles.data}>
                        {orderDetails.color || "N/A"}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Size: </div>
                      <div className={styles.data}>
                        {orderDetails.size || "N/A"}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Quantity</div>
                      <div className={styles.data}>
                        {orderDetails?.quantity}
                      </div>
                    </div>
                    {orderDetails.offerName && (
                      <>
                        <div className={styles.infoHolder}>
                          <div className={styles.title}>Offer</div>
                          <div className={styles.data}>
                            {orderDetails.offerName}
                          </div>
                        </div>
                        <div className={styles.infoHolder}>
                          <div className={styles.title}>
                            Offer has discount ?
                          </div>
                          <div className={styles.data}>
                            {orderDetails.offerHasCommonDiscount ? "Yes" : "No"}
                          </div>
                        </div>
                        <div className={styles.infoHolder}>
                          <div className={styles.title}>Offer's Discount</div>
                          <div className={styles.data}>
                            {orderDetails.offerName} %
                          </div>
                        </div>
                      </>
                    )}
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Gift Coupen Used</div>
                      <div className={styles.data}>N/A</div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Is a Gift</div>
                      <div className={styles.data}>
                        {orderDetails.isGift ? (
                          <div style={{ color: "var(--default-green)" }}>
                            Yes
                          </div>
                        ) : (
                          <div style={{ color: "var(--default-red)" }}>No</div>
                        )}{" "}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>
                        Total Charge For All Items{" "}
                      </div>
                      <div className={styles.data}>
                        Rs. {orderDetails.price}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Shipping Charge</div>
                      <div className={styles.data}>Rs. 60 </div>
                    </div>
                    {orderDetails.isGift && (
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Gift Wrap Charge</div>
                        <div className={styles.data}>Rs. 25 </div>
                      </div>
                    )}
                    <div
                      className={styles.infoHolder}
                      style={{
                        flexDirection: "column",
                        gap: 0,
                        marginTop: "20px",
                      }}
                    >
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem" }}
                      >
                        Total Order Price
                      </div>

                      <div
                        className={styles.data}
                        style={{ fontSize: "2.3rem" }}
                      >
                        Rs.{" "}
                        {orderDetails.price +
                          60 +
                          (orderDetails.isGift ? 25 : 0)}
                      </div>
                    </div>
                    {/* <div className={styles.infoHolder}>
                      <div className={styles.title}>Vendor</div>
                      <div className={styles.data}>XYZ SuperMaart</div>
                    </div> */}

                    <div
                      className={styles.actBtn}
                      style={{ marginTop: "20px" }}
                    >
                      <Button
                        onClick={() => {
                          Router.push(
                            `/seller/products/id?pid=${orderDetails.product?.id}`
                          );
                        }}
                      >
                        View Product
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={styles.customer}>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "flex-start",
                      gap: "100px",
                    }}
                  >
                    <div className={styles.details}>
                      <div className={styles.mainTitle}>Customer</div>
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Last Name</div>
                        <div className={styles.data}>
                          {orderDetails.userLastName}
                        </div>
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.mainTitle}>Delivery Details</div>

                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Address</div>
                        <div className={styles.data}>
                          <div>{orderDetails.nearestLandmark}</div>
                          <div>{orderDetails.deliveryAddress}</div>
                        </div>
                      </div>
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Order Placed At</div>
                        <div className={styles.data}>
                          {new Date(orderDetails.created_at).toDateString()}
                        </div>
                      </div>
                      {/* <div className={styles.infoHolder}>
                        <div className={styles.title}>
                          Expected Delivary Date
                        </div>
                        <div className={styles.data}>
                          {new Date(
                            new Date(orderDetails.created_at).getDate() + 3
                          ).toDateString()}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className={styles.statusControl}>
                  <div className={styles.mainTitle}>Order Status Control</div>
                  <div className={styles.actBtn}>
                    {orderDetails.status === "pending" &&
                      !orderDetails.canceledBySeller && (
                        <>
                          <Button onClick={() => setVerifyConfirmModal(true)}>
                            Verify Order
                          </Button>
                          <Button
                            color="error"
                            onClick={() => setCancelConfirmModal(true)}
                          >
                            Cancel Order
                          </Button>
                        </>
                      )}
                    {orderDetails.status !== "pending" && (
                      <h2>Order already verified</h2>
                    )}
                    {orderDetails.canceledBySeller && (
                      <h2>You already canceled this order...</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SellerNav>
    </>
  );
};

export default OrdersDetails;
