import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Image from "next/image";

import styles from "../../../styles/components/Admin/pages/SellerInfoPage.module.scss";
import { BsStarFill } from "react-icons/bs";
import ProductHolder from "../../../components/shared/Customer/ProductHolder";
import ShowCase from "../../../components/Customer/ShowCase";
import Button from "../../../components/shared/Button";
import Router, { useRouter } from "next/router";
import { TableHolder } from "../orders";

import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import IntputField from "../../../components/shared/Input";
import axios from "axios";
import { ProtuctType, Seller } from "../../../@types/global";
import { useAlert } from "../../_app";
import DialogBox from "../../../components/shared/DialogBox";

interface TableDef {
  SN: number;
  "Product's Name": string;
  "Items Sold": number;
  "Stock Remaining": number;
  "Edit Commision": any;
  Details: any;
  id: number;
}

const SellerInfoPage: React.FC = () => {
  const router = useRouter();
  const { id, sid } = router.query;

  const [comissionRate, setCommisionRate] = useState("300");
  const [comissionRateModal, setCommisionRateModal] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedProductID, setSelectedProductID] = useState();
  const [rowData, setRowData] = useState<TableDef[]>([]);
  const [columnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true, width: 245 },
    { field: "Items Sold", width: 125 },
    { field: "Stock Remaining", width: 155 },
    {
      field: "Edit Commision",
      cellRenderer: () => (
        <div
          onClick={() => {
            setCommisionRateModal(true);
          }}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
          }}
        >
          Edit
        </div>
      ),
    },
    {
      field: "Details",
      width: 125,
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  const [seller, setSeller] = useState<
    (Seller & { followerCount: number; productsCount: number }) | null
  >(null);
  const [newProducts, setNewProducts] = useState<ProtuctType[]>([]);
  const [mostSoldProducts, setMostSoldProducts] = useState<ProtuctType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { setAlert } = useAlert();
  const [banLoading, setBanLoading] = useState(false);
  const [banConfirmModal, setBanConfirmModal] = useState(false);
  const [banOrUnban, setBanOrUnban] = useState<"ban" | "unban">();

  const fetchData = async () => {
    try {
      (async () => {
        setLoading(true);
        const res = await axios.get<
          RespondType & {
            seller?: Seller & {
              followerCount: number;
              productCount: "number";
            };
          }
        >(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/oneSellerInfo`,
          {
            params: {
              sid,
            },
            withCredentials: true,
          }
        );
        setLoading(false);
        console.log(res.data);
        if (res.data.status === "ok" && res.data.seller) {
          setSeller(res.data.seller);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      })();

      (async () => {
        setLoadingProducts(true);
        const res = await axios.get<
          RespondType & {
            newProducts: ProtuctType[];
            mostSoldProducts: ProtuctType[];
          }
        >(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/getSellerDisplayProducts`,
          {
            params: {
              sid,
            },
            withCredentials: true,
          }
        );
        setLoadingProducts(false);

        if (res.data.status === "ok" && res.data.newProducts) {
          setNewProducts(res.data.newProducts);
          setMostSoldProducts(res.data.mostSoldProducts);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      })();

      (async () => {
        const res = await axios.get<
          RespondType & {
            products: ProtuctType[];
          }
        >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/products`, {
          params: {
            sid,
          },
          withCredentials: true,
        });
        setLoadingProducts(false);

        if (res.data.status === "ok" && res.data.products) {
          const productForRow: TableDef[] = res.data.products.map(
            (product, i) => {
              return {
                SN: i + 1,
                "Items Sold": product.timesBought,
                "Product's Name": product.name,
                "Stock Remaining": product.totalStock,
                Details: "",
                "Edit Commision": "",
                id: product.id,
              };
            }
          );
          console.log(productForRow);
          setRowData(productForRow);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      })();
    } catch {
      setAlert({
        type: "error",
        message: "failed to load seller info",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore && sid) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [sid]);

  const handleBanSeller = async () => {
    try {
      setBanLoading(true);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/banSeller`,
        {
          sid,
        },
        { withCredentials: true }
      );
      setBanConfirmModal(false);

      setBanLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchData();
      } else {
        setAlert({
          type: "message",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "message",
        message: "failed to ban user",
      });
    }
  };
  const handleUnbanSeller = async () => {
    try {
      setBanLoading(true);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/unbanSeller`,
        {
          sid,
        },
        { withCredentials: true }
      );
      setBanConfirmModal(false);
      setBanLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchData();
      } else {
        setAlert({
          type: "message",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "message",
        message: "failed to ban user",
      });
    }
  };

  const handleCommissionSubmit = async () => {
    try {
      console.log(sid);
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/addProductCommission`,
        {
          sid: sid,
          pid: selectedProductID,
          commission: comissionRate,
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
    <AdminLayout>
      <Modal
        isOpen={banConfirmModal}
        style={customStyles}
        onRequestClose={() => setBanConfirmModal(false)}
      >
        <DialogBox title="Deactivate Confirm">
          <div className={styles.confirmModal}>
            <div className={styles.content}>
              Do you want to {banOrUnban} this seller?
            </div>
            <div className={styles.actBtn}>
              <Button
                onClick={
                  banOrUnban === "ban" ? handleBanSeller : handleUnbanSeller
                }
              >
                Yes
              </Button>
              <Button color="error" onClick={() => setBanConfirmModal(false)}>
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <Modal
        isOpen={comissionRateModal}
        style={customStyles}
        onRequestClose={() => {
          setCommisionRateModal(false);
        }}
      >
        <IntputField
          label="Commision Rate"
          setState={setCommisionRate}
          value={comissionRate}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <Button onClick={handleCommissionSubmit}>Save</Button>
          <Button
            color="error"
            onClick={() => {
              setCommisionRateModal(false);
            }}
          >
            Cancle
          </Button>
        </div>
      </Modal>
      {loading && <h2>Loading...</h2>}
      {!loading && !seller && <h2>No seller info found</h2>}
      {!loading && seller && (
        <div className={styles.sellerInfoPage}>
          <div className={styles.profileImg}>
            <Image
              src="/images/placeHolders/placeHolder.jpeg"
              width={150}
              height={150}
            />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.name}>{seller.storeName}</div>
            <div className={styles.address}>{seller.address}</div>
            <div className={styles.rating}>
              <BsStarFill />
              <span>{seller.rating}</span>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.data}>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>Status: </span>
                <span
                  className={`${styles.infoContent} ${
                    seller.isVerified ? styles.verified : ""
                  }`}
                >
                  {seller.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>Signed Up Date: </span>
                <span className={`${styles.infoContent}`}>
                  {seller.created_at}
                </span>
              </div>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>Total Products Sold: </span>
                <span className={`${styles.infoContent}`}>
                  {seller.itemsSold}
                </span>
              </div>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>
                  Total Products sold this month:{" "}
                </span>
                <span className={`${styles.infoContent}`}>12</span>
              </div>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>Total Follower: </span>
                <span className={`${styles.infoContent}`}>
                  {seller.followerCount}
                </span>
              </div>
              <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>Total Items added: </span>
                <span className={`${styles.infoContent}`}>
                  {seller.productCount}
                </span>
              </div>
              {/* <div className={styles.infoHolder}>
                <span className={styles.infoTitle}>
                  Store Visites this month:{" "}
                </span>
                <span className={`${styles.infoContent}`}>6</span>
              </div> */}
            </div>
            <div className={styles.newItemAdded}>
              <div className={styles.title}>Newest Items Addded</div>
              <div className={styles.itemsShowcase}>
                {newProducts.map((product, i) => (
                  <ProductHolder
                    productName={product.name}
                    discount={product.discount}
                    mp={product.price}
                    rating={product.rating}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.topSoldItems}>
            {!loadingProducts && (
              <ShowCase title="Most Sold Items" products={mostSoldProducts} />
            )}
          </div>
          <div
            className={styles.allItems}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <TableHolder
              columData={columnDef}
              rowData={rowData}
              inputRef={searchRef}
              title="All Products"
              onCellClicked={(e) => {
                if (e.colDef.field === "Details") {
                  Router.push(`/admin/products/id?pid=${e.data.id}`);
                } else if (e.colDef.field === "Edit Commision") {
                  setSelectedProductID(e.data.id);
                }
              }}
            />
          </div>
          <div className={styles.actBtn}>
            <Button>View Full Store</Button>
            {!seller.isBanned && (
              <Button
                color="error"
                onClick={() => {
                  setBanOrUnban("ban");
                  setBanConfirmModal(true);
                }}
                disable={banLoading}
              >
                Deactivate Seller
              </Button>
            )}
            {seller.isBanned && (
              <Button
                color="success"
                onClick={() => {
                  setBanOrUnban("unban");
                  setBanConfirmModal(true);
                }}
                disable={banLoading}
              >
                Reactivate Seller
              </Button>
            )}
            {/* {id === "diact" && <Button color="error">Delete Seller</Button>} */}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SellerInfoPage;
