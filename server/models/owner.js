import mongoose, { Schema } from 'mongoose';

const ownerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = { Owner };
