import express from "express";

const validateAdmin: express.RequestHandler = (req, res, next) => {
  if (req.session.adminID == null) {
    res.json({
      status: "fail",
      message: "admin not logged in!",
    });
  } else {
    next();
  }
};

export default validateAdmin;
