import express from 'express';
let router = express.Router();

import { body } from 'express-validator';
import { ensureAuthenticated, forwardAuthenticated } from '../middleware/auth';

import categoryController from '../controllers/category';

// @route   POST /category/add
// @desc    Create a new category
// @access  Private
router.post('/add', categoryController.addCategory);

// @route   GET /category/all
// @desc    GET all categories
// @access  Private
router.get('/all', categoryController.getAllCategories);

// @route   GET /category/:id
// @desc    GET category by id
// @access  Private
router.get('/:id', categoryController.getCategoryId);

// @route   PUT /category/:id
// @desc    Update a category by id
// @access  Private
router.put('/:id', categoryController.updateCategoryById);

// @route   DELETE /category/:id
// @desc    Delete a new category by id
// @access  Private
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
