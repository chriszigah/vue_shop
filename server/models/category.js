import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryType: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
