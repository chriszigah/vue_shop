import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1
    },
    name: {
      type: String,
      maxlength: 100
    },
    lastname: {
      type: String,
      maxlength: 100
    },
    role: {
      type: Number,
      default: 0
    },
    token: {
      type: String,
      default: ""
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
