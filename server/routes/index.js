import express from "express";
const router = express.Router();

//Routes
import usersRoutes from "../routes/users";
import productsRoutes from "../routes/product";
import categoryRoutes from "../routes/category";
import ownerRoutes from "../routes/owner";

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
router.use("/product", productsRoutes);
router.use("/category", categoryRoutes);
router.use("/owner", ownerRoutes);

module.exports = router;
