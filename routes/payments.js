const express = require("express");
const passport = require("passport");
const router = new express.Router();

const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const House = require("../models/House");
const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get(
  "/pending",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user.id;

    try {
      const payment = await Payment.where({ toUser: user })
        .populate({ path: "booking", populate: { path: "house" } })
        .populate("fromUser")
        .exec();
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/confirm",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const payment = req.body;
    const user = req.user.id;

    Payment.findById(payment._id)
      .populate("toUser")
      .populate("booking")
      .exec(async function (err, foundPayment) {
        if (err) {
          return res.status(422).send(err);
        }

        if (
          foundPayment.status === "pending" &&
          user.id === foundPayment.toUser.id
        ) {
          const booking = foundPayment.booking;

          const charge = await stripe.charges.create({
            amount: booking.totalPrice * 100,
            currency: "usd",
            customer: payment.fromStripeCustomerId,
          });

          if (charge) {
            Booking.updateOne(
              { _id: booking },
              { status: "active" },
              function () {}
            );

            foundPayment.charge = charge;
            foundPayment.status = "paid";

            foundPayment.save(function (err) {
              if (err) {
                return res.status(422).send(err);
              }

              User.updateOne(
                { _id: foundPayment.toUser },
                { $inc: { revenue: foundPayment.amount } },
                function (err, user) {
                  if (err) {
                    return res.status(422).send(err);
                  }

                  return res.status(200).json({ status: "paid" });
                }
              );
            });
          }
        }
      });
  }
);

// router.post(
//   "/confirm",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const payment = req.body;
//     const user = req.user._id;

//     Payment.findById(payment._id)
//       .populate("to")
//       .populate("booking")
//       .exec(async function (err, foundPayment) {
//         if (err) {
//           return res.status(422).send(err);
//         }

//         if (
//           foundPayment.paymentStatus === "pending" &&
//           user.id === foundPayment.to.id
//         ) {
//           const booking = foundPayment.booking;

//           const charge = await stripe.charges.create({
//             amount: booking.totalPrice * 100,
//             currency: "usd",
//             customer: payment.stripeId,
//           });

//           if (charge) {
//             Booking.updateOne(
//               { _id: booking },
//               { paymentStatus: "active" },
//               function () {}
//             );

//             foundPayment.charge = charge;
//             foundPayment.paymentStatus = "paid";

//             foundPayment.save(function (err) {
//               if (err) {
//                 return res.status(422).send(err);
//               }

//               User.updateOne(
//                 { _id: foundPayment.to },
//                 { $inc: { revenue: foundPayment.amount } },
//                 function (err, user) {
//                   if (err) {
//                     return res.status(422).send(err);
//                   }

//                   return res.json({ paymentStatus: "paid" });
//                 }
//               );
//             });
//           }
//         }
//       });
//   }
// );

router.post(
  "/decline",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const payment = req.body;
    const { booking } = payment;

    Booking.deleteOne({ id: booking._id }, (err, deletedBooking) => {
      if (err) {
        return res.status(422).send(err);
      }

      Payment.updateOne(
        { _id: payment._id },
        { status: "Declined" },
        function () {}
      );
      House.updateOne(
        { _id: booking.house._id },
        { $pull: { bookings: booking._id } },
        () => {}
      );

      return res.status(200).json({ status: "Declined" });
    });
  }
);

module.exports = router;
