const express = require("express");
const passport = require("passport");
const router = new express.Router();

const Booking = require("../models/Booking");
const User = require("../models/User");
const House = require("../models/House");
const Payment = require("../models/Payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CUSTOMER_SHARE = 0.8;

router.get(
  "/manage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user.id;
    try {
      const booking = await Booking.where({ user }).populate("house");

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { checkIn, checkOut, totalPrice, guests, days, house, paymentToken } =
      req.body;

    const user = req.user._id;

    const booking = new Booking({
      checkIn,
      checkOut,
      totalPrice,
      guests,
      days,
    });

    House.findById(house._id)
      .populate("bookings")
      .populate("user")
      .exec(async function (error, foundHouse) {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        if (isBookingValid(booking, foundHouse)) {
          booking.user = user;
          booking.house = foundHouse;
          foundHouse.bookings.push(booking);

          const { payment, error } = await createPayment(
            booking,
            foundHouse.user,
            paymentToken
          );

          if (payment) {
            booking.payment = payment;

            booking.save(function (error) {
              if (error) {
                return res.status(500).json({ message: error.message });
              }

              foundHouse.save();
              User.updateOne(
                { _id: req.user._id },
                { $push: { bookings: booking } },
                function () {}
              );

              return res.json({
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
              });
            });
          } else {
            return res.status(422).json({ message: "Invalid Payment." });
          }
        } else {
          return res
            .status(422)
            .json({ message: "Choosen dates are already taken." });
        }
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user._id;

      const bookings = await Booking.where({ user }).populate("houses");

      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

isBookingValid = (selectedBooking, house) => {
  let isValid = true;

  if (house.bookings && house.bookings.length > 0) {
    isValid = house.bookings.every(function (booking) {
      const selectedCheckIn = selectedBooking.checkIn;
      const selectedCheckOut = selectedBooking.checkOut;

      const actualCheckIn = booking.checkIn;
      const actualCheckOut = booking.checkOut;

      return (
        (actualCheckIn < selectedCheckIn && actualCheckOut < selectedCheckIn) ||
        (selectedCheckOut < actualCheckOut && selectedCheckOut < actualCheckIn)
      );
    });
  }
  return isValid;
};

// createPayment = async (booking, to, token) => {
//   const { user } = booking;
//   const tokenId = token.id || token;

//   const customer = await stripe.customers.create({
//     source: tokenId,
//     email: user.email,
//   });

//   if (customer) {
//     User.updateOne(
//       { _id: user._id },
//       { $set: { stripeId: customer.id } },
//       () => {}
//     );

//     const payment = new Payment({
//       from: user,
//       to,
//       stripeId: customer.id,
//       booking,
//       tokenId: token.id,
//       amount: booking.totalPrice * 100 * CUSTOMER_SHARE,
//     });

//     try {
//       const savedPayment = await payment.save();
//       return { payment: savedPayment };
//     } catch (error) {
//       return { message: error.message };
//     }
//   } else {
//     return { message: "Cannot process Payment." };
//   }
// };

async function createPayment(booking, toUser, token) {
  const { user } = booking;
  const tokenId = token.id || token;

  const customer = await stripe.customers.create({
    source: tokenId,
    email: user.email,
  });

  if (customer) {
    User.updateOne(
      { _id: user.id },
      { $set: { stripeId: customer.id } },
      () => {}
    );

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE,
    });

    try {
      const savedPayment = await payment.save();
      return { payment: savedPayment };
    } catch (err) {
      return { err: err.message };
    }
  } else {
    return { err: "Cannot process Payment!" };
  }
}

module.exports = router;
