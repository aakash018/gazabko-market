import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";
import { customStyles } from "../../modalStyle";
import { TableHolder } from "../admin/orders";

import Modal from "react-modal";
import SellerNav from "../../components/Seller/SellerNav";
import axios from "axios";
import { Category, SubCategory } from "../../@types/global";
import { useAlert } from "../_app";
import Router from "next/router";

interface CategoryTableDef {
  SN: number;
  "Category Name": string;
  Commission: string;
}

interface SubCAtegoryTableDef {
  SN: number;
  "Sub Category Name": string;
  "Belonging Category": string;
  Commission: string;
}

interface ProductComTableDef {
  SN: number;
  "Product's Name": string;
  Commission: number;
  id: any;
}

const EditCommision = () => {
  const searchCatRef = useRef<HTMLInputElement>(null);
  const [productComLoading, setProductComLoading] = useState(false);

  const [comissionRate, setCommisionRate] = useState("300");
  const [comissionRateModal, setCommisionRateModal] = useState(false);

  const [catRowData, setCatRowData] = useState<CategoryTableDef[]>([]);
  const { setAlert } = useAlert();

  const [catColumnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Category Name", resizable: true },
    { field: "Commission" },
  ]);

  const [subCatRowData, setSubCatRowData] = useState<SubCAtegoryTableDef[]>([]);

  const [subCatColumnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Sub Category Name", resizable: true },
    { field: "Belonging Category", resizable: true },
    { field: "Commission" },
  ]);

  const [productRowData, setProductRowData] = useState<ProductComTableDef[]>(
    []
  );

  const [productColoumDef] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true },
    { field: "Commission" },
    {
      field: "Details",
      cellRenderer: () => (
        <div
          style={{
            color: "var(--theme-color)",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<
            RespondType & { categories: Category[]; subCategory: SubCategory[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/commission/getCategoryCommission`,
            {
              withCredentials: true,
            }
          );

          if (res.data.status === "ok") {
            const catCommissionTable: CategoryTableDef[] =
              res.data.categories.map((category, i) => ({
                SN: i + 1,
                "Category Name": category.name,
                Commission: `Rs. ${category.commission}`,
              }));

            const sunCatCommissionTable: SubCAtegoryTableDef[] =
              res.data.subCategory.map((category, i) => ({
                SN: i + 1,
                "Belonging Category": (category as any).category,
                "Sub Category Name": category.name,
                Commission: `Rs. ${category.commission}`,
              }));

            setCatRowData(catCommissionTable);
            setSubCatRowData(sunCatCommissionTable);
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
      })();

      (async () => {
        try {
          setProductComLoading(true);
          const res = await axios.get<
            RespondType & {
              commissions?: {
                product: {
                  name: string;
                  id: string;
                };
                commission: number;
              }[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/commission/getProductCommission`,
            {
              withCredentials: true,
            }
          );
          console.log(res.data);
          if (res.data.status === "ok" && res.data.commissions) {
            const productComTable: ProductComTableDef[] =
              res.data.commissions?.map((pro, i) => ({
                "Product's Name": pro.product.name,
                SN: i + 1,
                Commission: pro.commission,
                id: pro.product.id,
              }));

            setProductRowData(productComTable);
            setProductComLoading(false);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setProductComLoading(false);
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
  }, []);

  return (
    <SellerNav>
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
          <Button>Save</Button>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableHolder
          columData={catColumnDef}
          rowData={catRowData}
          title="Common Commision For Categories Used"
          inputRef={searchCatRef}
          width={470}
        />
        <TableHolder
          columData={subCatColumnDef}
          rowData={subCatRowData}
          title="Unique Commision For Sub Categories Used"
          inputRef={searchCatRef}
          width={665}
        />
        {productComLoading && <h2>Loading...</h2>}
        {!productComLoading && (
          <TableHolder
            columData={productColoumDef}
            rowData={productRowData}
            title="Unique Commision For Products Uploaded"
            inputRef={searchCatRef}
            width={665}
            onCellClicked={(e) => {
              if (e.colDef.field === "Details") {
                Router.push(`/seller/products/id?pid=${e.data.id}`);
              }
            }}
          />
        )}
      </div>
    </SellerNav>
  );
};

export default EditCommision;
