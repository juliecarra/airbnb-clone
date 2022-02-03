const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: { type: Number },
    days: { type: Number },
    totalPrice: { type: Number },
    status: { type: String, default: "pending" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    house: { type: Schema.Types.ObjectId, ref: "House" },
    review: { type: Schema.Types.ObjectId, ref: "Review" },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
