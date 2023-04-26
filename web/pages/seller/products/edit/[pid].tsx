import { useRouter } from "next/router";
import React from "react";
import AddProdducts from "../../../../components/shared/AddProdducts";

const EditProducts = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <div>
        <AddProdducts type="seller" work="edit" pid={pid} />
      </div>
    </div>
  );
};

export default EditProducts;
