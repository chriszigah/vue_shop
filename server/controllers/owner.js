import { Owner } from "../models/owner";

import { validationResult } from "express-validator";

exports.addOwner = async (req, res, next) => {
  try {
    const imageUrl = req.file.location;
    const { title, about } = req.body;

    console.log(req.boy);
    console.log(imageUrl);

    const owner = new Owner({
      title,
      about,
      imageUrl,
    });

    await owner.save();

    res.status(201).json({
      success: true,
      message: "Successfull Created a new Owner",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllOwners = async (req, res, next) => {
  try {
    let owner = await Owner.find();

    res.status(200).json({
      sucess: true,
      Owners: owner,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.getOwnerById = async (req, res, next) => {
  try {
    let owner = await Onwer.findOne({ _id: req.params.id });

    res.status(200).json({
      sucess: true,
      Owner: Owner,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.updateOwnerById = async (req, res, next) => {
  try {
    let updatedOwner = await Owner.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          about: req.body.about,
          imageUrl: req.file.location,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      sucess: true,
      updatedOwner: updatedOwner,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.deleteOwnerById = async (req, res, next) => {
  try {
    let deletedOwner = await Owner.findOneAndDelete({ _id: req.params.id });

    if (deletedOwner) {
      return res.status(200).json({
        success: true,
        message: "Sucessfully deleted Owner",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
