import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Order } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import OrderTracker from "../../../components/shared/Customer/OrderTracker";
import IntputField from "../../../components/shared/Input";

import styles from "../../../styles/components/Admin/pages/OrderDetails.module.scss";
import { useAlert } from "../../_app";

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

  useEffect(() => {
    let ignore = false;
    if (!ignore && oid) {
      (async () => {
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
      })();
    }
  }, [oid]);

  return (
    <AdminLayout>
      <h1>Order Details</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && order !== null && (
        <div className={styles.orderDetails}>
          <div className={styles.tracker}>
            <OrderTracker />
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
                  <div className={styles.title}>Original Price</div>
                  <div className={styles.data}>Rs. {order?.product?.price}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Discount</div>
                  <div className={styles.data}>
                    Rs. {order?.product?.discount || 0}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Shipping Charge</div>
                  <div className={styles.data}>Rs. 65</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Total Charge For 1 Item</div>
                  <div className={styles.data}>
                    Rs. {order?.product?.priceAfterDiscount}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Quantity</div>
                  <div className={styles.data}>{order?.quantity}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>
                    Total Charge For All Items{" "}
                  </div>
                  <div className={styles.data}>
                    Rs. {order!.product!.priceAfterDiscount * order!.quantity}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Vendor</div>
                  <div className={styles.data}>{order?.product?.store}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Gift Coupen Used</div>
                  <div className={styles.data}>N/A</div>
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
                      Router.push("/admin/customers/sdad");
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
                    setAddress={setAddress}
                    lat={JSON.parse(order.latlng).lat}
                    lng={JSON.parse(order.latlng).lng}
                  />
                </div>
              )}
            </div>
            <div className={styles.statusControl}>
              <div className={styles.mainTitle}>Order Status Control</div>
              <div className={styles.statusHolder}>
                <div className={styles.text}>Order Verified by Vendor</div>
                <div className={styles.button}>
                  <IntputField type={"checkbox"} />
                </div>
              </div>
              <div className={styles.statusHolder}>
                <div className={styles.text}>Order Recieved</div>
                <div className={styles.button}>
                  <IntputField type={"checkbox"} />
                </div>
              </div>
              <div className={styles.statusHolder}>
                <div className={styles.text}>Order Out for Delivery</div>
                <div className={styles.button}>
                  <IntputField type={"checkbox"} />
                </div>
              </div>
              <div className={styles.statusHolder}>
                <div className={styles.text}>Order Delivered Successfully</div>
                <div className={styles.button}>
                  <IntputField type={"checkbox"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default OrderDetails;
