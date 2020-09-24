import express from "express";
let router = express.Router();

import { body } from "express-validator";
import { ensureAuthenticated, forwardAuthenticated } from "../middleware/auth";

import productController from "../controllers/product";

// @route   POST /product/add
// @desc    Create a new product
// @access  Private
router.post("/add", productController.addProduct);

// @route   GET /product/all
// @desc    GET all categories
// @access  Private
router.get("/all", productController.getAllProducts);

// @route   GET /product/:id
// @desc    GET product by id
// @access  Private
router.get("/:id", productController.getProductById);

// @route   PUT /product/:id
// @desc    Update a product by id
// @access  Private
router.put("/:id", productController.updateProductById);

// @route   DELETE /product/:id
// @desc    Delete a new product by id
// @access  Private
router.delete("/:id", productController.deleteProductById);

module.exports = router;
