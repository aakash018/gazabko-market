import React, { useRef, useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import SelectedItemHolder from "../../../../components/Admin/shared/SelectedItemHolder";
import Button from "../../../../components/shared/Button";
import IntputField from "../../../../components/shared/Input";
import TagsSelector from "../../../../components/shared/TagsSelector";

import styles from "../../../../styles/components/Admin/pages/AddGiftCoupens.module.scss";
import { generateCode } from "../../../../utils/autoGenetateCode";

const Add: React.FC = () => {
  const [codeInputState, setCodeInput] = useState<string>();
  const expDateInput = useRef<HTMLInputElement>(null);
  const minPurchesInput = useRef<HTMLInputElement>(null);
  const productSKUInput = useRef<HTMLInputElement>(null);
  const vendorInput = useRef<HTMLInputElement>(null);
  const discountInnput = useRef<HTMLInputElement>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const handelCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedCategories.includes(e.target.value)) return;
    setSelectedCategories((prev) => [...prev, e.target.value]);
  };

  const handelProductSelect = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (productSKUInput.current) {
        if (selectedProducts.includes(productSKUInput.current?.value)) return;
        setSelectedProducts((prev) => [
          ...prev,
          productSKUInput.current!.value,
        ]);
      }
    }
  };

  const handelCancelCatSelect = (select: string) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== select));
  };

  const handelGenerateCode = () => {
    setCodeInput(generateCode());
  };

  return (
    <AdminLayout>
      <h1>Add Gift Coupens</h1>
      <div className={styles.addGiftCoupen}>
        <div className={styles.coupenCode}>
          <IntputField
            label="Coupen Code"
            value={codeInputState}
            setState={setCodeInput}
          />
          <Button onClick={handelGenerateCode}>Generte Random Code</Button>
        </div>
        <IntputField input={expDateInput} type="date" label="Exp. Date" />
        <IntputField
          input={minPurchesInput}
          type="number"
          label="Minium Purches Value"
        />
        <div className={styles.discountAmount}>
          <IntputField
            input={discountInnput}
            label="Discount Offerred"
            type={"number"}
          />
          <select>
            <option value={"percentage"}>percentage</option>
            <option value={"amount"}>amount</option>
          </select>
        </div>
        <div className={styles.coupenLimitsSelector}>
          <div className={styles.categoriesSelect}>
            <div className={styles.label}>Only for added catagories</div>
            <select onChange={handelCatSelect}>
              <option value={"Women's Fashion"}>Women's Fashion</option>
              <option value={"Men's Fashion"}>Men's Fashion</option>
              <option value={"Electronic Devices"}>Electronic Devices</option>
              <option value={"Health & Fitness"}>Health & Fitness</option>
              <option value={"Games"}>Games</option>
              <option value={"Gazabko Drinks"}>Gazabko Drinks</option>
            </select>
            <div className={styles.selectedItem}>
              {selectedCategories.map((cat, i) => (
                <SelectedItemHolder
                  content={cat}
                  key={i}
                  onCancel={() => {
                    handelCancelCatSelect(cat);
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.productSelector}>
            <TagsSelector
              listState={selectedProducts}
              setListState={setSelectedProducts}
              label="Only for added  Products"
              placeholder="Product SKU number"
            />
          </div>
          <div className={styles.productSelector}>
            <TagsSelector
              listState={selectedVendors}
              setListState={setSelectedVendors}
              label="Only for added Venddors"
            />
          </div>
        </div>
        <div className={styles.saveBtn}>
          <Button>Save</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Add;
