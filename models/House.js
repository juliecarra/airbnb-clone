const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: { type: String },
    address: { type: String },
    town: { type: String, required: true, lowercase: true },
    area: { type: String, required: true, lowercase: true },
    country: { type: String, required: true, lowercase: true },
    location: Array,
    image: { type: String },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    houseType: { type: String, required: true },
    houseRules: [{ type: String }],
    services: [{ type: String }],
    amenities: [
      {
        outdoor: { type: Array },
        indoor: { type: Array },
        familyFriendly: { type: Array },
        essentials: { type: Array },
        shared: { type: Array },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// houseSchema.pre("save", async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location.push(loc[0].latitude, loc[0].longitude);
//   this.address = undefined;

//   next();
// });

const House = mongoose.model("House", houseSchema);
module.exports = House;
