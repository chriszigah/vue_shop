import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
