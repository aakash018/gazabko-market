import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import AdminImageUpload from "../../../../components/Admin/shared/AdminImageUpload";

const EditLoader: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <div>
          <h1>Edit Page</h1>
        </div>
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AdminImageUpload
            title="Edit Loader animation"
            buttonText="Upload Loader"
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default EditLoader;
