import React, { useEffect, useState } from "react";

import { Order } from "../../../@types/global";
import axios from "axios";
import { useAlert } from "../../_app";
import { ReturnMessageHolder } from "../../admin/orders/returnedOrders";
import SellerNav from "../../../components/Seller/SellerNav";

const Pending: React.FC = () => {
  const [returnedOrders, setReturnedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { returns: Order[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/returnedOrders`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "ok") {
        setReturnedOrders(res.data.returns);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    if (ignore) return;
    fetchPageData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <SellerNav>
      <h1>Returned Orders</h1>
      <div
        style={{
          // display: "flex",
          // flexDirection: "d"
          // flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
          gap: "20px",
        }}
      >
        {loading && <h2>Loading...</h2>}
        {!loading && returnedOrders.length === 0 && (
          <h2>No any returned orders</h2>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "20",
            flexWrap: "wrap",
          }}
        >
          {!loading &&
            returnedOrders.length !== 0 &&
            returnedOrders.map((order, i) => {
              if (order.return)
                return (
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <ReturnMessageHolder
                      key={i}
                      img={"/images/shoes2.webp"}
                      name={order.product!.name}
                      message={order.return!.message}
                      orderID={order.id}
                      user={(order as any).user}
                      orderAccepted={order.return.requestAccepted}
                      orderRejected={order.return.requestRejected}
                      showActBtn={false}
                    />
                  </div>
                );
            })}
        </div>
      </div>
    </SellerNav>
  );
};

export default Pending;
