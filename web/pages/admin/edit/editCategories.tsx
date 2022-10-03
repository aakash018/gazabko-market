import React, { useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EditCategories = () => {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "S.N" },
    { field: "Icon" },
    { field: "Category Name" },
    { field: "Total Products" },
    { field: "Total Vendors" },
    { field: "Edit" },
    { field: "Delete" },
  ]);
  return (
    <div>
      <AdminLayout>
        <div>
          <div className="">
            {" "}
            <h1>Edit Categories</h1>{" "}
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 350, width: "100%", overflow: "hidden" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default EditCategories;
