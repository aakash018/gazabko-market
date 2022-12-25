import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductInfoDisplay from "../../components/Customer/ProductDisplay";
import Layout from "../../components/Customer/Layout";
import styles from "../../styles/components/Customer/pages/ProductDisplay.module.scss";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import ReviewContainer from "../../components/Customer/ReviewContainer";
import Button from "../../components/shared/Button";
import ShowCase from "../../components/Customer/ShowCase";
import Breadcrumb from "../../components/Customer/Breadcrumb";
import Image from "next/image";
import { useAuth } from "../../context/User";
import Link from "next/link";
import axios from "axios";
import { ProtuctType } from "../../@types/global";
import { useAlert } from "../_app";

interface QuestionsHolderProps {
  question: string;
  userAvatarUrl: string;
  name: string;
  date: string;
  replyAvatarUrl: string;
  replyName: string;
  replyDate: string;
  reply: string;
}

const QuestionsHolder: React.FC<QuestionsHolderProps> = ({
  userAvatarUrl,
  date,
  name,
  question,
  replyAvatarUrl,
  reply,
  replyDate,
  replyName,
}) => {
  return (
    <div className={styles.questionsHolder}>
      <div className={styles.question}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src={userAvatarUrl}
              width={50}
              height={50}
              objectFit="cover"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
        <div className={styles.qus}>{question}</div>
      </div>
      <div className={styles.replies}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src={replyAvatarUrl}
              width={50}
              height={50}
              objectFit="cover"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{replyName}</div>
            <div className={styles.date}>{replyDate}</div>
          </div>
        </div>
        <div className={styles.qus}>{reply}</div>
      </div>
    </div>
  );
};

const ProductDisplay: React.FC = () => {
  const { isLogedIn } = useAuth();

  const router = useRouter();
  const { id } = router.query;
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProtuctType | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get<RespondType & { product?: ProtuctType }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/info`,
        {
          params: {
            id: id,
          },
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setProduct(res.data!.product);
        setLoading(false);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    })();
  }, []);

  return (
    <Layout>
      {loading && <h2>Loading...</h2>}
      {!loading && product && (
        <div className={styles.productDisplay}>
          <div className={styles.productInfo}>
            <Breadcrumb
              category={{ name: "Women's Clothing", url: "womens-clothing" }}
              subCategory={{ name: "Fashion", url: "fashion" }}
            />
            <ProductInfoDisplay
              totalStock={product!.totalStock}
              discount={product!.discount as number}
              mp={product!.price}
              name={product!.name}
              rating={4.7}
              sellerName={product!.store as string}
              brand={product!.brand}
            />
          </div>
          <div className={styles.productDesc}>
            <section className={styles.title}>Product details:</section>
            <section className={styles.desc}>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </section>
          </div>
          <div style={{ display: "flex", gap: "25px" }}>
            <div>
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
                  <Button onClick={() => {}} look="outlined">
                    Load More
                  </Button>
                </section>
              </div>
              <div className={styles.questionsContainer}>
                <h2>Questions About This Product </h2>
                <QuestionsHolder
                  question={"Is this available in Type C ?"}
                  userAvatarUrl={"/images/avatar.jpg"}
                  name={"Joe Don"}
                  date={"22 September 2004"}
                  replyAvatarUrl={"/images/brand.png"}
                  reply="type c not available "
                  replyDate="23 September 2004"
                  replyName="Golden Xyz Superstore"
                />
                <QuestionsHolder
                  question={"Is this available in Type C ?"}
                  userAvatarUrl={"/images/avatar.jpg"}
                  name={"Joe Don"}
                  date={"22 September 2004"}
                  replyAvatarUrl={"/images/brand.png"}
                  reply="type c not available "
                  replyDate="23 September 2004"
                  replyName="Golden Xyz Superstore"
                />
                <QuestionsHolder
                  question={"Is this available in Type C ?"}
                  userAvatarUrl={"/images/avatar.jpg"}
                  name={"Joe Don"}
                  date={"22 September 2004"}
                  replyAvatarUrl={"/images/brand.png"}
                  reply="type c not available "
                  replyDate="23 September 2004"
                  replyName="Golden Xyz Superstore"
                />
              </div>
              <div className={styles.questionsInput}>
                <div className={styles.content}>
                  <h2>Ask a Question To Seller</h2>
                  {!isLogedIn && (
                    <>
                      <div className={styles.notLogeedIn}>
                        You must be loged in to ask questions.{" "}
                        <Link href={"/login"}>
                          <span>LOGIN</span>
                        </Link>{" "}
                        here
                      </div>
                    </>
                  )}
                  {isLogedIn && (
                    <>
                      {" "}
                      <textarea cols={30} rows={10}></textarea>
                      <Button className={styles.actBtn}>Post</Button>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.otherProducts}>
                <ShowCase
                  title="People also like"
                  includeTimer={false}
                  noOfProducts={16}
                />
              </div>
            </div>
            <div
              style={{
                width: "25%",
                padding: "10px 10px 10px 0px",
                marginTop: "-50px",
              }}
            >
              <div className={styles.otherProducts}>
                <ShowCase
                  title="Other from the seller"
                  includeTimer={false}
                  noOfProducts={8}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDisplay;
