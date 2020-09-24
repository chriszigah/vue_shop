import express from "express";
let router = express.Router();

import { body } from "express-validator";
import { ensureAuthenticated, forwardAuthenticated } from "../middleware/auth";

import ownerController from "../controllers/owner";

// @route   POST /owner/add
// @desc    Create a new owner
// @access  Private
router.post("/add", ownerController.addOwner);

// @route   GET /owner/all
// @desc    Get all owners
// @access  Private
router.get("/all", ownerController.getAllOwners);

// @route   GET /owner/:id
// @desc    GET owner by id
// @access  Private
router.get("/:id", ownerController.getOwnerById);

// @route   PUT /owner/:id
// @desc    Update owner by id
// @access  Private
router.put("/:id", ownerController.updateOwnerById);

// @route   DELETE /owner/:id
// @desc    Delete owner by id
// @access  Private
router.delete("/:id", ownerController.deleteOwnerById);

module.exports = router;
