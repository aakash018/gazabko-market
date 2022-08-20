import React from "react";
import styles from "../../../styles/components/shared/Customer/Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.infoTab}>
          <section className={styles.title}>Contact us</section>
          Call us <br />
          <div className={styles.number}>9846523283</div>
          Newroad, Pokhara, Nepal
        </div>
        <div className={styles.infoTab}>
          <section className={styles.title}>Quick links</section>
          <ul>
            <li>Policy</li>
            <li>Term & Condition</li>
            <li>Return</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className={styles.infoTab}>
          <section className={styles.title}>Company</section>
          <ul>
            <li>About Us</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={styles.infoTab}>
          <section className={styles.title}>Bussiness</section>
          <ul>
            <li>Sell on Gazzab Ko Market</li>
            <li>Affiliate Program</li>
            <li>Gazzab Ko Market Blogs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
