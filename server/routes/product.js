import express from "express";
let router = express.Router();

import { body } from "express-validator";
import { ensureAuthenticated, forwardAuthenticated } from "../middleware/auth";

import productController from "../controllers/product";

// @route   POST /product/add
// @desc    Create a new product
// @access  Private
router.post("/add", productController.addProduct);

module.exports = router;
