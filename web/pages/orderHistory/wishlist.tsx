import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import CartItemHolder from "../../components/shared/Customer/CartItemHolder";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import cartStyles from "../../styles/components/Customer/pages/cartPage.module.scss";
import { WishlistProductsType, WishlistType } from "../../@types/global";
import axios from "axios";
import { useAlert } from "../_app";

const Wishlist: React.FC = () => {
  const { setAlert } = useAlert();
  const [items, setItems] = useState<WishlistProductsType[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { wishlist?: WishlistType }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/wishlist/getWishList`,
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      if (res.data.status === "ok" && res.data.wishlist) {
        setItems(res.data.wishlist.items);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to connect to servers",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OrderHistoryLayout>
      <div className={styles.title}>My Wishlist</div>

      <div className={cartStyles.cartBody} style={{ width: "100%" }}>
        {loading && <h2>Loading...</h2>}
        {!loading && items?.length === 0 && <h2>No items found</h2>}
        {!loading && items?.length !== 0 && (
          <div className={cartStyles.cartItems} style={{ width: "100%" }}>
            {items.map((item, i) => (
              <CartItemHolder
                check={false}
                onChecked={() => {}}
                key={i}
                showCheck={false}
                showQuantity={false}
                name={item.product!.name}
                quantity={0}
                itemID={item.id}
                mp={item.product!.price}
                type="wishlist"
                discount={
                  item.product!.offers &&
                  item.product!.offers!.starting_date <= new Date() &&
                  item.product!.offers!.ending_date >= new Date() &&
                  item.product!.offers?.common_discount &&
                  item.product!.offers.discount
                    ? item.product!.price *
                      (item.product!.offers.discount / 100)
                    : item.product!.discount
                }
                id={item.product!.id}
                onItemDelete={fetchData}
                //? PLACEHOLDER
                setLoading={function (
                  value: React.SetStateAction<boolean>
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </OrderHistoryLayout>
  );
};

export default Wishlist;
