import React from "react";
import { useRouter } from "next/router";
import ProductInfoDisplay from "../../components/Customer/ProductDisplay";
import Layout from "../../components/Customer/Layout";
import styles from "../../styles/components/Customer/pages/ProductDisplay.module.scss";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import ReviewContainer from "../../components/Customer/ReviewContainer";
import Button from "../../components/shared/Button";
import ShowCase from "../../components/Customer/ShowCase";
import Breadcrumb from "../../components/Customer/Breadcrumb";
import CategoriesHoverMenu from "../../components/Customer/CategoriesHolderMenu";

const ProductDisplay: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout sidebar="show">
      <div className={styles.productDisplay}>
        <div className={styles.productInfo}>
          <CategoriesHoverMenu /> 
          <Breadcrumb category={{ name: "Women's Clothing", url: "womens-clothing" }} subCategory={{ name: "Fashion", url: "fashion" }} />
          <ProductInfoDisplay
            totalStock={5}
            discount={2000}
            mp={2700}
            name={"Ultra Light 3 Layer Silicone Jacket For Men"}
            rating={4.7}
            sellerName="Siwakoti Photocopy and Electronics"
          />
        </div>
        <div className={styles.productDesc}>
          <section className={styles.title}>Product details:</section>
          <section className={styles.desc}>
            Fabric (Outer/Inner Layer): Wind + Water repellent Polyester <br />
            Filling: 100% Silicone (Premium Quality) <br />
            Style: Solid Regular Fit
            <br />
          </section>
        </div>
        <div className={styles.review}>
          <section className={styles.title}>Rating and review</section>
          <section className={styles.rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <span>4.7</span>
          </section>
          <div className={styles.reviewHouse}>
            <ReviewContainer
              name={"Willy"}
              rating={4.7}
              review={`A jacket is a must have in winter. You can't be cold and stylish. Our jackets
                  are made of high quality material and will keep you warm. They come in different
                   colors and sizes, so your style is covered.`}
            />
            <ReviewContainer
              name={"Willy"}
              rating={4.7}
              review={`A jacket is a must have in winter. You can't be cold and stylish. Our jackets
                  are made of high quality material and will keep you warm. They come in different
                   colors and sizes, so your style is covered.`}
            />
          </div>
          <section className={styles.actionBtn}>
            <Button onClick={() => { }} look="outlined">
              Load More
            </Button>
          </section>
        </div>
        <div className={styles.otherProducts}>
          <ShowCase
            title="Other Products from the seller"
            includeTimer={false}
            noOfProducts={5}
          />
          <ShowCase
            title="People also like"
            includeTimer={false}
            noOfProducts={5}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDisplay;
