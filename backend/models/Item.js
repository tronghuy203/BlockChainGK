const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    cost: { type: Number },
    fromAddress: { type: String },
    toAddress: { type: String },
    itemAddress: {type: String},
    hash: { type: String },
    status: { type: String },
    contractIndex: { type: Number },
    rating: { type: Number, default: null },
    isRated: { type: Boolean, default: false },
    buyer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);