import express from "express";
const router = express.Router();

//Routes
const usersRoutes = require("../routes/users");

import { ensureAuthenticated, forwardAuthenticated } from "../middleware/auth";

router.get("/get-session", ensureAuthenticated, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname
    }
  });
});

router.get("/success_login", (req, res, next) => {
  res.status(200).json({
    isAuth: true,
    message: "Login in was successfull"
  });
});

router.get("/unsuccess_login", (req, res, next) => {
  res.status(400).json({
    isAuth: false,
    message: "Invalid Email/Password Combination"
  });
});

router.use("/user", usersRoutes);

module.exports = router;
