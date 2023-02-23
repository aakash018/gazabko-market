import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/Admin/AdminNav";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";
import { customStyles } from "../../modalStyle";
import { TableHolder } from "../admin/orders";

import Modal from "react-modal";
import SellerNav from "../../components/Seller/SellerNav";
import axios from "axios";
import { Category, SubCategory } from "../../@types/global";
import { useAlert } from "../_app";

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

const EditCommision = () => {
  const searchCatRef = useRef<HTMLInputElement>(null);

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

  const [productRowData] = useState([
    {
      SN: 1,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 2,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 3,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 4,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 5,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 6,
      "Product's Name": "Golden Princess Shoes",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
  ]);

  const [productColoumDef] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true },
    { field: "Belonging Category", resizable: true },
    { field: "Commision" },
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
        <TableHolder
          columData={productColoumDef}
          rowData={productRowData}
          title="Unique Commision For Products Uploaded"
          inputRef={searchCatRef}
          width={665}
        />
      </div>
    </SellerNav>
  );
};

export default EditCommision;
