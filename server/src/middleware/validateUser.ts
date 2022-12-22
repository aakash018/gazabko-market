import express from "express";

const validateUser: express.RequestHandler = (req, res, next) => {
  if (req.session.user == null) {
    res.json({
      status: "fail",
      message: "user not logged in!",
    });
  } else {
    next();
  }
};

export default validateUser;
