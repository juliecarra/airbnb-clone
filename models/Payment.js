// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const paymentSchema = new Schema(
//   {
//     stripeId: { type: String },
//     tokenId: { type: String },
//     amount: { type: Number },
//     charge: Schema.Types.Mixed,
//     paymentStatus: { type: String, default: "pending" },
//     from: { type: Schema.Types.ObjectId, ref: "User" },
//     to: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     booking: { type: Schema.Types.ObjectId, ref: "Booking" },
//   },
//   { timestamps: true }
// );

// const Payment = mongoose.model("Payment", paymentSchema);
// module.exports = Payment;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  fromStripeCustomerId: String,
  amount: Number,
  tokenId: String,
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toUser: { type: Schema.Types.ObjectId, ref: "User" },
  booking: { type: Schema.Types.ObjectId, ref: "Booking" },
  charge: Schema.Types.Mixed,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Payment", paymentSchema);
