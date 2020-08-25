import { Product } from "../models/product";

import { validationResult } from "express-validator";

// @route   POST /product/add
// @desc    Create a new product
// @access  Private
exports.addProduct = async (req, res, next) => {
  try {
    const { title, description, productImage, price, stockQuantity } = req.body;

    const product = new Product({
      title,
      description,
      productImage,
      price,
      stockQuantity
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Successfull Created a new Product"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// @route   GET /product
// @desc    Get all products
// @access  Public

// @route   GET /product/:id
// @desc    Get a single product with id
// @access  Public

// @route   PUT /product/update
// @desc    update a product
// @access  Public

// @route   DELETE /product/delete/:id
// @desc    delete a product by id
// @access  Public
