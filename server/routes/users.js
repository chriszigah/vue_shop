import express from "express";
let router = express.Router();

import { body } from "express-validator";
//const checkAuth = require("../middleware/checkAuth");
//const isAuth = require("../middleware/isAuth");
import { ensureAuthenticated, forwardAuthenticated } from "../middleware/auth";

import userController from "../controllers/user";

/* GET users listing. */
router.post(
  "/register",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("must be atleast 5 characters"),
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("a valid name is required"),
    body("lastname")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("a valid name is required")
  ],
  userController.registerUser
);

// Login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").not().trim().isEmpty().withMessage("Invalid Password")
  ],
  forwardAuthenticated,
  userController.loginUser
);

router.get("/logout", ensureAuthenticated, userController.logoutUser);

module.exports = router;
