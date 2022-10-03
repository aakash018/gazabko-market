import React, { useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "../../../components/shared/Button";
import Modal from "react-modal";

import styles from "../../../styles/components/Admin/pages/EditCategories.module.scss";
import AddCategoriesModal from "../../../components/Admin/AddCategoriesModal";
import { customStyles } from "../../../modalStyle";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type TableCol = {
  SN: number;
  Icon: any;
  "Category Name": string;
  Products: number;
  Vendors: number;
  Edit: any;
  Delete: any;
};

const EditCategories = () => {
  const [addCatModal, setAddCatModal] = useState(false);
  const [rowData] = useState<TableCol[]>([
    {
      SN: 1,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
    {
      SN: 2,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },

    {
      SN: 3,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
    {
      SN: 4,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
    {
      SN: 5,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
    {
      SN: 6,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
    {
      SN: 7,
      Icon: "",
      "Category Name": "sdd",
      Products: 45,
      Vendors: 4,
      Delete: "",
      Edit: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 55 },
    { field: "Icon", width: 125 },
    { field: "Category Name" },
    { field: "Products", width: 115 },
    { field: "Vendors", width: 115 },
    {
      field: "Edit",
      width: 115,
      //   cellStyle: "center",
      cellRenderer: () => {
        return <AiFillEdit color="#5F97B9" size={20} />;
      },
    },
    {
      field: "Delete",
      width: 115,
      cellRenderer: () => {
        return <AiFillDelete color="#F36868" size={20} />;
      },
    },
  ]);

  const handleModalOpen = () => {
    setAddCatModal(true);
  };

  const handleModalClose = () => {
    setAddCatModal(false);
  };
  return (
    <>
      <Modal
        isOpen={addCatModal}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <AddCategoriesModal />
      </Modal>
      <AdminLayout>
        <div className={styles.editCategoriesPage}>
          <div className={styles.title}>
            {" "}
            <h1>Edit Categories</h1>{" "}
          </div>
          <div className={styles.addBtn}>
            <Button onClick={handleModalOpen}>Add</Button>
          </div>
          <div
            className={` ${styles.table} ag-theme-alpine`}
            style={{ height: 350, width: "80%", overflow: "hidden" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditCategories;
