const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    // parameter: {
    //   type: Number,
    //   required: true
    // },
    value: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    executed: {
      type: Boolean,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    account: {
      type: String,
      required: true
    },
    signature: {
      type: String,
      required: true
    },
    dexag: {
      to: {
        type: String,
      },
      data: {
        type: String,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
