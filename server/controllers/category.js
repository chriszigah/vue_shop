import { Category } from '../models/category';

import { validationResult } from 'express-validator';

exports.addCategory = async (req, res, next) => {
  try {
    const { categoryType } = req.body;

    const category = new Category({
      categoryType,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Successfull Created a new Category',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// @route   GET /category/all
// @desc    Get all categories
// @access  Public

exports.getAllCategories = async (req, res, next) => {
  try {
    let category = await Category.find();

    res.status(200).json({
      sucess: true,
      Categories: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.getCategoryId = async (req, res, next) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });

    res.status(200).json({
      sucess: true,
      Category: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.updateCategoryById = async (req, res, next) => {
  try {
    let updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          categoryType: req.body.categoryType,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      sucess: true,
      updatedCategory: updatedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.deleteCategoryById = async (req, res, next) => {
  try {
    let deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedCategory) {
      return res.status(200).json({
        success: true,
        message: 'Sucessfully deleted Category',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
