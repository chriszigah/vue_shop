import { Product } from "../models/product";
import { validationResult } from "express-validator";

exports.addProduct = async (req, res, next) => {
  try {
    const imageUrl = req.file.location;
    const {
      title,
      description,
      categoryID,
      ownerID,
      price,
      stockQuantity,
    } = req.body;

    const product = new Product({
      title,
      description,
      categoryID,
      ownerID,
      imageUrl,
      price,
      stockQuantity,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Successfull Created a new Product",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let product = await Product.find();

    res.status(200).json({
      sucess: true,
      Products: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.status(200).json({
      sucess: true,
      Product: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    let updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          imageUrl: req.file.location,
          stockQuantity: req.body.stockQuantity,
          owner: req.body.owner,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      sucess: true,
      updatedProduct: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: "Sucessfully deleted Product",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
