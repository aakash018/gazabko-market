import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "../../../../components/shared/Button";
import Modal from "react-modal";

import styles from "../../../../styles/components/Admin/pages/EditCategories.module.scss";

import { AiFillDelete } from "react-icons/ai";
import AddCategoriesModal from "../../../../components/Admin/AddCategoriesModal";
import { customStyles } from "../../../../modalStyle";
import Router from "next/router";
import axios from "axios";
import { Category } from "../../../../@types/global";
import { useAlert } from "../../../_app";

type TableCol = {
  SN: number;
  id: string;
  "Category Name": string;
  Products: number;
  Vendors: number;
  // Edit: any;
  Delete: any;
};

const EditCategories = () => {
  const [addCatModal, setAddCatModal] = useState(false);
  const [editCatModal, setEditCatModal] = useState(false);
  const [rowData, setRowData] = useState<TableCol[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 55 },
    { field: "Category Name", resizable: true },
    { field: "Products", width: 115 },
    { field: "Vendors", width: 115 },
    // {
    //   field: "Edit",
    //   width: 115,
    //   // cellStyle: "center",
    //   cellRenderer: () => {
    //     return (
    //       <div>
    //         <AiFillEdit color="#5F97B9" size={20} />
    //       </div>
    //     );
    //   },
    // },
    {
      field: "Delete",
      width: 115,
      cellRenderer: () => {
        return <AiFillDelete color="#F36868" size={20} />;
      },
    },
    {
      field: "Details",
      width: 125,
      cellRenderer: () => {
        return (
          <span
            style={{
              color: "var(--theme-color)",
              fontWeight: "bold",
            }}
            onClick={() => {
              Router.push("/admin/edit/editCategories/sdasd");
            }}
          >
            View
          </span>
        );
      },
    },
  ]);

  const { setAlert } = useAlert();

  const fetchData = async () => {
    try {
      const res = await axios.get<RespondType & { categories?: Category[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/getCatsForTable`,
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "ok" && res.data.categories) {
        const catForTable: TableCol[] = res.data.categories.map((cat, i) => ({
          SN: i + 1,
          Products: (cat as any).productCount,
          "Category Name": cat.name,
          Vendors: (cat as any).sellerCount,
          Delete: "",
          Edit: "",
          id: cat.id,
        }));

        setRowData(catForTable);
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const handleModalOpen = () => {
    setAddCatModal(true);
  };

  const handleModalClose = () => {
    setAddCatModal(false);
  };

  const handleDeleteCat = async (id: string) => {
    try {
      const res = await axios.delete<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/deleteCategory`,
        {
          params: {
            cid: id,
          },
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        fetchData();
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
    <>
      <Modal
        isOpen={addCatModal}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <AddCategoriesModal
          afterSubmit={() => {
            setAddCatModal(false);
            fetchData();
          }}
        />
      </Modal>
      <Modal
        isOpen={editCatModal}
        onRequestClose={() => {
          setEditCatModal(false);
        }}
        style={customStyles}
        ariaHideApp={false}
      >
        <AddCategoriesModal
          catName="Random Cat Name"
          catCommision={"200"}
          subCategory={["Random Cat", "Random sub Cat", "Jeans"]}
        />
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
            style={{ height: 350, width: "750px", overflow: "hidden" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(e) => {
                if (e.colDef.field === "Delete") {
                  if (e.data?.Products !== 0) {
                    setAlert({
                      type: "error",
                      message: "can't delete a category with product in it",
                    });
                  } else {
                    handleDeleteCat(e.data.id);
                  }
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditCategories;
