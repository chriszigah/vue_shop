import mongoose from "mongoose";

const loginSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  { timestamps: true }
);

const Login = mongoose.model("Login", loginSchema);

module.exports = { Login };
