import express from "express";

const validateSeller: express.RequestHandler = (req, res, next) => {
  if (req.session.sellerID == null) {
    res.json({
      status: "fail",
      message: "seller not logged in!",
    });
  } else {
    next();
  }
};

export default validateSeller;
