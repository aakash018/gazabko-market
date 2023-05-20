import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Modal from "react-modal";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { Order } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import OrderTracker from "../../../components/shared/Customer/OrderTracker";

import styles from "../../../styles/components/Admin/pages/OrderDetails.module.scss";
import { useAlert } from "../../_app";
import { customStyles } from "../../../modalStyle";
import DialogBox from "../../../components/shared/DialogBox";

const Map = dynamic(
  () => import("../../../components/shared/Map"), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
);

const OrderDetails = () => {
  const router = useRouter();
  const { oid } = router.query;
  const [address, setAddress] = useState("");
  const [viewMap, setViewMap] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);

  const { setAlert } = useAlert();
  const [verifyOrderModal, setVerifyOrderModal] = useState(false);

  const fetchDate = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { order?: Order }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getOneOrderInfo`,
        {
          params: { oid },
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "ok" && res.data.order) {
        setOrder(res.data.order);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to load order",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore && oid) {
      fetchDate();
    }
  }, [oid]);

  const handleReceivedOrder = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/verifyReceivedOrder`,
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
        fetchDate();
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed  to update order status",
      });
    }
  };

  const handleOutForDeliveryOrder = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/verifyOutForDelivery`,
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
        fetchDate();
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed  to update order status",
      });
    }
  };
  const handleDeliveredOrder = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/verifyDelivered`,
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
        fetchDate();
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed  to update order status",
      });
    }
  };

  const handleVerifyOrder = async () => {
    try {
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/verifyOrder`,
        {
          oid,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        setVerifyOrderModal(false);
        fetchDate();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={verifyOrderModal}
        style={customStyles}
        onRequestClose={() => setVerifyOrderModal(false)}
      >
        <DialogBox title="Confirm Order">
          <div className="confirmModal">
            <div className="content">
              Do you really want to verify this order?
            </div>
            <div className="actBtn">
              <Button color="success" onClick={handleVerifyOrder}>
                Yes
              </Button>
              <Button color="error" onClick={() => setVerifyOrderModal(false)}>
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <AdminLayout>
        <h1>Order Details</h1>
        {loading && <h2>Loading...</h2>}
        {!loading && order !== null && (
          <div className={styles.orderDetails}>
            <div className={styles.tracker}>
              <OrderTracker
                orderState={order.state}
                orderStatus={order.status}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.product}>
                <div className={styles.img}>
                  <Image src={"/images/shoes2.webp"} width={250} height={250} />
                </div>
                <div className={styles.content}>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Name</div>
                    <div className={styles.data}>{order?.product?.name}</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Product Original Price</div>
                    <div className={styles.data}>
                      Rs. {order?.product?.price}
                    </div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Product Discount</div>
                    <div className={styles.data}>
                      Rs. {order?.product?.discount || 0}
                    </div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Shipping Charge</div>
                    <div className={styles.data}>Rs. 60</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Product Price</div>
                    <div className={styles.data}>
                      Rs. {order?.product?.priceAfterDiscount}
                    </div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Color: </div>
                    <div className={styles.data}>{order.color || "N/A"}</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Size: </div>
                    <div className={styles.data}>{order.size || "N/A"}</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Quantity</div>
                    <div className={styles.data}>{order?.quantity}</div>
                  </div>
                  {/* <div className={styles.infoHolder}>
                    <div className={styles.title}>
                      Total Charge For All Items{" "}
                    </div>
                    <div className={styles.data}>
                      Rs. {order!.product!.priceAfterDiscount * order!.quantity}
                    </div>
                  </div> */}
                  {order.offerName && (
                    <>
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Offer</div>
                        <div className={styles.data}>{order.offerName}</div>
                      </div>
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Offer has discount ?</div>
                        <div className={styles.data}>
                          {order.offerHasCommonDiscount ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className={styles.infoHolder}>
                        <div className={styles.title}>Offer's Discount</div>
                        <div className={styles.data}>
                          {order.offerDiscount} %
                        </div>
                      </div>
                    </>
                  )}
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Total Order Price</div>
                    <div className={styles.data}>{order.price}</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Vendor</div>
                    <div className={styles.data}>{order?.product?.store}</div>
                  </div>
                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Gift Coupen Used</div>
                    <div className={styles.data}>N/A</div>
                  </div>

                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Is a Gift</div>
                    <div className={styles.data}>
                      {order.isGift ? (
                        <div style={{ color: "var(--default-green)" }}>Yes</div>
                      ) : (
                        <div style={{ color: "var(--default-red)" }}>No</div>
                      )}{" "}
                    </div>
                  </div>

                  <div className={styles.infoHolder}>
                    <div className={styles.title}>
                      Total Charge For All Items{" "}
                    </div>
                    <div className={styles.data}>Rs. {order.price}</div>
                  </div>

                  <div className={styles.infoHolder}>
                    <div className={styles.title}>Shipping Charge</div>
                    <div className={styles.data}>Rs. 60 </div>
                  </div>
                  {order.isGift && (
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
                    <div className={styles.title} style={{ fontSize: "2rem" }}>
                      Total Order Price
                    </div>

                    <div className={styles.data} style={{ fontSize: "2.3rem" }}>
                      Rs. {order.price + 60 + (order.isGift ? 25 : 0)}
                    </div>
                  </div>
                  <div className={styles.actBtn}>
                    <Button
                      onClick={() => {
                        Router.push(
                          `/admin/products/id?pid=${order.product!.id}`
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
                      <div className={styles.title}>Name</div>
                      <div className={styles.data}>
                        {order.user?.firstName} {order.user?.lastName}
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Phone No.</div>
                      <div className={styles.data}>{order.user?.phoneNo}</div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Email</div>
                      <div className={styles.data}>{order.user?.email}</div>
                    </div>
                    <Button
                      onClick={() => {
                        Router.push(
                          `/admin/customers/id?uid=${order.user?.id}`
                        );
                      }}
                    >
                      View Customer
                    </Button>
                  </div>
                  <div
                    className={styles.details}
                    style={{
                      maxWidth: "400px",
                    }}
                  >
                    <div className={styles.mainTitle}>Delivery Details</div>

                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Address</div>
                      <div className={styles.data}>
                        <div>{order.nearestLandmark}</div>
                        <div>{order.deliveryAddress}</div>
                      </div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Order Placed At</div>
                      <div className={styles.data}>{order.created_at}</div>
                    </div>
                    <div className={styles.infoHolder}>
                      <div className={styles.title}>Expected Delivary Date</div>
                      <div className={styles.data}></div>
                    </div>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        color: "var(--theme-color)",
                        cursor: "pointer",
                      }}
                      onClick={() => setViewMap((prev) => !prev)}
                    >
                      {!viewMap ? "View in map" : "Close map"}
                    </span>
                  </div>
                </div>
                {viewMap && (
                  <div
                    style={{
                      width: "100%",
                      height: 200,
                      marginTop: "30px",
                    }}
                    className={styles.map}
                  >
                    <Map
                      moveAblePointer={false}
                      setAddress={setAddress}
                      lat={JSON.parse(order.latlng).lat}
                      lng={JSON.parse(order.latlng).lng}
                    />
                  </div>
                )}
              </div>

              {order.product?.store === "admin" && (
                <div>
                  <div></div>
                </div>
              )}

              {order.product?.store === "admin" &&
                order.status === "pending" && (
                  <div className={styles.verifyOrder}>
                    <div className={styles.context}>Verify this order?</div>
                    <div className={styles.actBtn}>
                      <Button
                        color="success"
                        onClick={() => setVerifyOrderModal(true)}
                      >
                        Yes
                      </Button>
                      <Button color="error">No</Button>
                    </div>
                  </div>
                )}

              {order.status === "pending" && (
                <h2
                  className={styles.statusHolder}
                  style={{ color: "var(--theme-red)" }}
                >
                  Order yet to be verified
                </h2>
              )}
              {order.status !== "pending" && (
                <div className={styles.statusControl}>
                  <div className={styles.mainTitle}>Order Status Control</div>
                  {order.status === "processing" && (
                    <div className={styles.statusHolder}>
                      <div className={styles.text}>
                        Order Verified by Vendor
                      </div>
                      <GiCheckMark color="green" size={20} />
                    </div>
                  )}

                  <div className={styles.statusHolder}>
                    <div className={styles.text}>Order Recieved</div>
                    <div className={styles.button}>
                      {order.status === "processing" &&
                        order.state === null && (
                          <Button color="default" onClick={handleReceivedOrder}>
                            VERIFY
                          </Button>
                        )}
                      {order.state === "received" ||
                        (order.state === "outForDelivery" && (
                          <GiCheckMark color="green" size={20} />
                        ))}
                    </div>
                  </div>

                  <div className={styles.statusHolder}>
                    <div className={styles.text}>Order Out for Delivery</div>
                    <div className={styles.button}>
                      {order.state === "received" && (
                        <Button
                          color="default"
                          onClick={handleOutForDeliveryOrder}
                        >
                          VERIFY
                        </Button>
                      )}
                      {order.state === "outForDelivery" && (
                        <GiCheckMark color="green" size={20} />
                      )}
                    </div>
                  </div>
                  {order.canceledBySeller && (
                    <div>
                      <div>Order was canceled by seller</div>
                    </div>
                  )}
                  {/* {order} */}

                  {
                    <div className={styles.statusHolder}>
                      <div className={styles.text}>
                        Order Delivered Successfully
                      </div>
                      {order.status === "processing" &&
                        order.state === "outForDelivery" && (
                          <div className={styles.button}>
                            <Button
                              color="default"
                              onClick={handleDeliveredOrder}
                            >
                              VERIFY
                            </Button>
                          </div>
                        )}
                      {order.status === "delivered" && (
                        <GiCheckMark color="green" size={20} />
                      )}
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default OrderDetails;
