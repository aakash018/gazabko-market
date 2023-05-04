import React, { useEffect, useState } from "react";
import Layout from "../../components/Customer/Layout";
import OrderTracker from "../../components/shared/Customer/OrderTracker";
import styles from "../../styles/components/Customer/pages/PurchesTraker.module.scss";
import Image from "next/image";
import ShowCase from "../../components/Customer/ShowCase";
import { useRouter } from "next/router";
import { Order } from "../../@types/global";
import axios from "axios";
import { useAlert } from "../_app";

const PurchesTracker: React.FC = () => {
  const router = useRouter();

  const { id, oid } = router.query;

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
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/orderDetails`,
            {
              params: { oid: oid },
              withCredentials: true,
            }
          );
          console.log(res.data.order);
          setLoading(false);
          if (res.data.status === "ok" && res.data.order) {
            setOrder(res.data.order);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to connect to server",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [oid]);

  return (
    <Layout>
      {loading && <h2>Loading...</h2>}
      {!loading && !order && <h2>Failed to load order</h2>}
      {!loading && order && (
        <div className={styles.purchesTracker}>
          <div className={styles.tracker}>
            <OrderTracker orderState={order.state} orderStatus={order.status} />
          </div>
          <div className={styles.detailsCards}>
            <div className={styles.leftPart}>
              <div className={styles.product}>
                <div className={styles.title}>Product</div>
                <div className={styles.content}>
                  <div className={styles.productImg}>
                    <Image
                      src="/images/shoes.jpg"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.info}>
                    <div>{order.product?.name}</div>
                    <div>Rs. {order.product?.priceAfterDiscount}</div>
                    <div>Qty: {order.quantity}</div>
                  </div>
                </div>
              </div>
              <div className={styles.totalSummary}>
                <div className={styles.title}>Total Summary</div>
                <div className={styles.content}>
                  <div className={styles.info}>
                    <div className={styles.name}>Subtotal</div>
                    <div className={styles.data}>Rs. {order.price}</div>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>Shipping Fee</div>
                    <div className={styles.data}>Rs 60</div>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>Total</div>
                    <div className={styles.data}>Rs. {order.price + 60}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.shippingDetails}>
              <div className={styles.title}>Shipping Details</div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.name}>Ordered At</div>
                  <div className={styles.data}>
                    {order.created_at.split("T")[0]}
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>Delivery Address</div>
                  <div className={styles.data}>{order.deliveryAddress}</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>Nearest Landmark</div>
                  <div className={styles.data}>{order.nearestLandmark}</div>
                </div>
              </div>
            </div>
          </div>
          <ShowCase
            showTitle={true}
            title="More Products For You"
            noOfProducts={10}
          />
        </div>
      )}
    </Layout>
  );
};

export default PurchesTracker;
