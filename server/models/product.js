import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectID,
      ref: "Category"
    },
    owner: {
      type: Schema.Types.ObjectID,
      ref: "Owner"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stockQuantity: {
      type: Number,
      required: true
    },
    rating: { type: Number }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
