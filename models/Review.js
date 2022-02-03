const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ALLOWED_RATINGS = [1, 2, 3, 4, 5];

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
      minLength: [4, "Your review should be at least 4 characters long."],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    house: { type: Schema.Types.ObjectId, ref: "House" },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

reviewSchema.pre("save", async (next) => {
  if (ALLOWED_RATINGS.indexOf(this.rating) !== -1) next();
  else
    throw new Error({
      message:
        "Invalid Rating. Please select one of the available rating options.",
    });
});
