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
    txObj: {
      type: String,
      required: true
    },
    executed: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
