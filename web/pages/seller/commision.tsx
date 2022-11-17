import React, { useRef, useState } from "react";
import AdminLayout from "../../components/Admin/AdminNav";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";
import { customStyles } from "../../modalStyle";
import { TableHolder } from "../admin/orders";

import Modal from "react-modal";
import SellerNav from "../../components/Seller/SellerNav";

const EditCommision = () => {
  const searchCatRef = useRef<HTMLInputElement>(null);

  const [comissionRate, setCommisionRate] = useState("300");
  const [comissionRateModal, setCommisionRateModal] = useState(false);

  const [catRowData] = useState([
    {
      SN: 1,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 2,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 3,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 4,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 5,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 6,
      "Category Name": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
  ]);

  const [catColumnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Category Name", resizable: true },
    { field: "Commision" },
  ]);

  const [subCatRowData] = useState([
    {
      SN: 1,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 2,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 3,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 4,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 5,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
    {
      SN: 6,
      "Sub Category Name": "Jeans",
      "Belonging Category": "Women's Fassion",
      Commision: "Rs. 300",
      "Edit Commision": "",
    },
  ]);

  const [subCatColumnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Sub Category Name", resizable: true },
    { field: "Belonging Category", resizable: true },
    { field: "Commision" },
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
