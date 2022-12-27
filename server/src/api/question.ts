import express from "express";
import { Products } from "../entities/Products";
import { Question } from "../entities/QuestionAndAnswer";
import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

router.post("/askQuestion", validateUser, async (req, res) => {
  const userReq: { question: string; pid: string } = req.body;

  try {
    const user = await User.findOne({ where: { id: req.session.user } });
    const product = await Products.findOne({
      where: { id: parseInt(userReq.pid) },
    });
    if (user && product) {
      await Question.create({
        question: userReq.question,
        user: user,
        product: product,
        productID: parseInt(userReq.pid),
      }).save();

      res.json({
        status: "ok",
        message: "question saved",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "question saving fail",
    });
  }
});

router.get("/getQuestions", validateUser, async (req, res) => {
  const userReq = req.query as unknown as { pid: string };
  try {
    const questions = await Question.find({
      where: { productID: parseInt(userReq.pid) },
      relations: {
        user: true,
      },
    });

    res.json({
      status: "ok",
      message: "questions retrieved",
      questions,
    });
  } catch {
    res.json({
      status: "fail",
      message: "questions retrieving failed",
    });
  }
});

export default router;
