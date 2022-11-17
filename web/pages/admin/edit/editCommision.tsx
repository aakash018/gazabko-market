import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";

import styles from "../../../styles/components/Admin/pages/EditCommision.module.scss";
import { TableHolder } from "../orders";

import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

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
    {
      field: "Edit Commision",
      width: 150,
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
    {
      field: "Edit Commision",
      width: 150,

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
    {
      field: "Edit Commision",
      width: 150,
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
  ]);

  return (
    <AdminLayout>
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
        className={styles.editCommision}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableHolder
          columData={catColumnDef}
          rowData={catRowData}
          title="Common Commision For Categories"
          inputRef={searchCatRef}
          width={615}
        />
        <TableHolder
          columData={subCatColumnDef}
          rowData={subCatRowData}
          title="Unique Commision For Sub Categories"
          inputRef={searchCatRef}
          width={815}
        />
        <TableHolder
          columData={productColoumDef}
          rowData={productRowData}
          title="Unique Commision For Products"
          inputRef={searchCatRef}
          width={815}
        />
      </div>
    </AdminLayout>
  );
};

export default EditCommision;
