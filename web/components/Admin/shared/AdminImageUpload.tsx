import Image from "next/image";
import React from "react";
import styles from "../../../styles/components/shared/Admin/AdminImageUpload.module.scss";
import Button from "../../shared/Button";

interface Props {
  title: string;
  buttonText?: string;
  imgW?: number;
  imgH?: number;
}

const AdminImageUpload: React.FC<Props> = ({
  title,
  buttonText = "Upload",
  imgW = 200,
  imgH = 200,
}) => {
  return (
    <div className={styles.adminImageUpload}>
      <div className={styles.title}>{title}</div>
      <div className={styles.img}>
        <Image
          src="/images/placeHolders/placeHolder.jpeg"
          width={imgW}
          height={imgH}
          objectFit="cover"
        />
      </div>
      <Button>{buttonText}</Button>
    </div>
  );
};

export default AdminImageUpload;
