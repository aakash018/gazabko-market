import React, { useEffect, useRef, useState } from "react";
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
import { QuestionType, ReviewType } from "../../@types/rrr";

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
  const { pid } = router.query;
  const { setAlert } = useAlert();

  const questionRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProtuctType | undefined>(undefined);

  const [reviewLoading, setReviewLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [products, setProducts] = useState<ProtuctType[]>([]);

  const handleClick = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/question/askQuestion`,
      {
        question: questionRef.current?.value,
        pid,
      },
      { withCredentials: true }
    );

    console.log(res.data);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        setLoading(true);

        //? GETTING PRODUCT INFO
        try {
          if (product == null) {
            const res = await axios.get<
              RespondType & { product?: ProtuctType }
            >(
              `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/info`,
              {
                params: {
                  id: pid,
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
          }
          //? GETTING REVIEWS
          if (reviews.length === 0) {
            setReviewLoading(true);

            const reviewRes = await axios.get<
              RespondType & { reviews?: ReviewType[] }
            >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/getReview`, {
              params: {
                pid: pid,
              },
              withCredentials: true,
            });

            if (reviewRes.data.status === "ok" && reviewRes.data.reviews) {
              setReviews(reviewRes.data.reviews);
            }
            setReviewLoading(false);
          }

          //? GETTING QUESTIONS
          if (questions.length === 0 && pid) {
            setQuestionLoading(true);
            console.log(pid);
            const questionRes = await axios.get<
              RespondType & { questions?: QuestionType[] }
            >(
              `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/question/getQuestions`,
              {
                params: {
                  pid: pid,
                },
                withCredentials: true,
              }
            );

            if (
              questionRes.data.status === "ok" &&
              questionRes.data.questions
            ) {
              setQuestions(questionRes.data.questions);
            }
            setQuestionLoading(false);
          }

          if (products.length === 0 && pid) {
            const productRes = await axios.get<
              RespondType & { products?: ProtuctType[] }
            >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products`);

            if (productRes.data.status === "ok" && productRes.data.products) {
              setProducts(productRes.data.products);
            }
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to retrieve product info",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [pid]);

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
              id={product.id}
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
                  {reviewLoading && <h2>Loading...</h2>}
                  {!reviewLoading && reviews.length === 0 && (
                    <h2>No reviews found...</h2>
                  )}
                  {!reviewLoading &&
                    reviews.map((review, i) => (
                      <ReviewContainer
                        name={`${review.user?.firstName} ${review.user?.lastName}`}
                        rating={review.rating}
                        review={review.review}
                      />
                    ))}
                </div>
                {!reviewLoading && reviews.length !== 0 && (
                  <section className={styles.actionBtn}>
                    <Button onClick={() => {}} look="outlined">
                      Load More
                    </Button>
                  </section>
                )}
              </div>
              <div className={styles.questionsContainer}>
                <h2>Questions About This Product </h2>
                {questionLoading && <h2> Loading...</h2>}
                {!questionLoading && questions.length === 0 && (
                  <h2>No Questions Found</h2>
                )}
                {!questionLoading &&
                  questions.length !== 0 &&
                  questions.map((question, i) => (
                    <QuestionsHolder
                      question={question.question}
                      userAvatarUrl={question.user!.avatar}
                      name={`${question.user!.firstName} ${
                        question.user!.lastName
                      }`}
                      date={question.created_at}
                      replyAvatarUrl={"/images/brand.png"}
                      reply="type c not available "
                      replyDate="23 September 2004"
                      replyName="Golden Xyz Superstore"
                      key={i}
                    />
                  ))}
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
                      <textarea
                        cols={30}
                        rows={10}
                        ref={questionRef}
                      ></textarea>
                      <Button className={styles.actBtn} onClick={handleClick}>
                        Post
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.otherProducts}>
                <ShowCase
                  title="People also like"
                  includeTimer={false}
                  products={products}
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
                  products={products.slice(0, 5)}
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
