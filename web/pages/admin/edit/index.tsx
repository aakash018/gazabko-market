import Router from "next/router";
import React from "react";
import { AiFillDollarCircle, AiFillGift } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { RiFileSettingsLine } from "react-icons/ri";

import AdminLayout from "../../../components/Admin/AdminNav";
import EditOptionsButton from "../../../components/Admin/shared/EditOptionsButton";

import styles from "../../../styles/components/Admin/pages/Edit.module.scss";

const Edit: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.editPage}>
          <div className={styles.title}>
            <h1>Edit</h1>
          </div>
          <div className={styles.options}>
            <div className={styles.optionsGroup}>
              <EditOptionsButton
                icon={<BiCategoryAlt />}
                text="Edit Categories"
                bgColor="#2CBBF9"
                onClick={() => {
                  Router.push("/admin/edit/editCategories");
                }}
              />
              <EditOptionsButton
                icon={<AiFillDollarCircle />}
                text="Edit  Deals"
                bgColor="#F36868"
                onClick={() => {
                  Router.push("/admin/edit/editDeals");
                }}
              />
              <EditOptionsButton
                icon={<FiPackage />}
                text="Edit Products"
                bgColor="#00AB77"
                onClick={() => {}}
              />
            </div>
            <div className={styles.optionsGroup}>
              <EditOptionsButton
                icon={<GiReceiveMoney />}
                text="Edit Seller’s Commision "
                bgColor="#F9512C"
                onClick={() => {}}
              />
              <EditOptionsButton
                icon={<AiFillGift />}
                text="Edit Gift Coupens"
                bgColor="#7C63DE"
                onClick={() => {}}
              />
              <EditOptionsButton
                icon={<RiFileSettingsLine />}
                text="Edit Page Settings"
                bgColor="#E2B02E"
                onClick={() => {
                  Router.push("/admin/edit/editPageSettings");
                }}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Edit;
