import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import styles from "../../../../styles/components/Admin/pages/EditGftCoupens.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../../../components/shared/Button";

type TableDef = {
  SN: number;
  Code: string;
  "Exp Date": string;
  "Times Used": number;
  Details: any;
  Edit: any;
  Delete: any;
};

const EditGftCoupens: React.FC = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Code: "JSD2FU",
      "Exp Date": "9 July 2022",
      "Times Used": 4,
      Delete: "",
      Details: "",
      Edit: "",
    },
    {
      SN: 2,
      Code: "JSD2FU",
      "Exp Date": "9 July 2022",
      "Times Used": 4,
      Delete: "",
      Details: "",
      Edit: "",
    },
    {
      SN: 3,
      Code: "JSD2FU",
      "Exp Date": "9 July 2022",
      "Times Used": 4,
      Delete: "",
      Details: "",
      Edit: "",
    },
    {
      SN: 4,
      Code: "JSD2FU",
      "Exp Date": "9 July 2022",
      "Times Used": 4,
      Delete: "",
      Details: "",
      Edit: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Code" },
    { field: "Exp Date" },
    { field: "Times Used" },
    {
      field: "Details",
      width: 100,
      cellRenderer: () => (
        <div style={{ color: "#5494F5", fontWeight: "bold" }}>View</div>
      ),
    },
    {
      field: "Edit",
      width: 100,
      cellRenderer: () => (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <BiEdit size={25} color={"#5494F5"} />
        </div>
      ),
    },
    {
      field: "Delete",
      width: 100,
      cellRenderer: () => (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <MdDelete size={25} color={"#F36868"} />
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <div>
        <h1>Gift Coupens</h1>
      </div>
      <div className={styles.editGiftCoupens}>
        <div className={styles.table}>
          <div className={styles.addBtn}>
            <Button>Add</Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditGftCoupens;
