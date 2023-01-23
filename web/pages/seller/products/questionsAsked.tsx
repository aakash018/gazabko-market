import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { QuestionType } from "../../../@types/rrr";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

import styles from "../../../styles/components/Seller/pages/QuestionsAsked.module.scss";
import { useAlert } from "../../_app";

interface QuestionHolderProps {
  questions: QuestionType;
  afterPost?: () => any;
}

const QuestionsHolder: React.FC<QuestionHolderProps> = ({
  questions,
  afterPost,
}) => {
  const [answer, setAnswer] = useState("");
  const { setAlert } = useAlert();
  const handlePostAnswer = async () => {
    if (answer.trim() === "") {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/addAnswer`,
        {
          questionId: questions.id,
          answer,
        },
        { withCredentials: true }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: "question answered",
        });
        if (afterPost) {
          afterPost();
        }
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.error(e);
      setAlert({
        type: "error",
        message: "failed to add answer",
      });
    }
  };

  return (
    <div className={styles.questionsHolder}>
      <div className={styles.product}>
        <div className={styles.img}>
          <Image src={"/images/shoes3.jpg"} width={50} height={50} />
        </div>
        <div className={styles.name}>{questions.product?.name}</div>
        <div
          className={styles.options}
          onClick={() => {
            Router.push(`/seller/products/${questions.product?.id}`);
          }}
        >
          View Product
        </div>
      </div>
      <div className={styles.asker}>
        <div className={styles.avatar}>
          <Image src={questions.user!.avatar} width={70} height={70} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            {questions.user?.firstName} {questions.user?.lastName}
          </div>
          <div className={styles.date}>{questions.created_at}</div>
        </div>
      </div>
      <div className={styles.question}>{questions.question}</div>
      <IntputField label="Reply" value={answer} setState={setAnswer} />
      <Button onClick={handlePostAnswer}>Post</Button>
    </div>
  );
};

const QuestionsAsked = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionType[]>([]);
  const { setAlert } = useAlert();
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { questions?: QuestionType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getQuestions`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.questions != null) {
            setQuestion(res.data.questions);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to load questions",
          });
        }
      })();
    }
    return () => {
      ignore === false;
    };
  }, []);

  return (
    <SellerNav>
      <h1
        style={{
          marginBottom: 40,
        }}
      >
        Questions Asked
      </h1>
      {loading && <h2>Loading...</h2>}
      {!loading && questions.length === 0 && <h2>No questions found</h2>}
      {!loading && questions.length !== 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            gap: 30,
          }}
        >
          {questions.map((qus, i) => (
            <QuestionsHolder
              questions={qus}
              key={i}
              afterPost={() => {
                setQuestion((prev) =>
                  prev.filter((question) => qus.id !== question.id)
                );
              }}
            />
          ))}
        </div>
      )}
    </SellerNav>
  );
};

export default QuestionsAsked;
