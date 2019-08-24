const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    ownerAddress: {
      type: String,
      required: true
    },
    contractAddress: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
