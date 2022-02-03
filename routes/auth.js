const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = new express.Router();

const User = require("../models/User");

router.post("/withEmail", (req, res) => {
  const { firstName, lastName, email, birthdate, phoneNumber, password } =
    req.body;

  if (!firstName || !password || !email)
    return res.status(422).json({ message: "is required." });

  User.findOne({ email }).exec(function (err, user) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    if (user) return res.status(409).json({ message: "User already exists." });

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      birthdate,
      password,
    });

    user.save();

    return res.status(201).json({
      success: true,
      user,
      message: "You are successfully registered.",
    });
  });
});

router.post("/withPhoneNumber", (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;

  if (!firstName || !password || !phoneNumber)
    return res.status(422).json({ message: "is required." });

  User.findOne({ phoneNumber }).exec(function (err, user) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    if (user) return res.status(409).json({ message: "User already exists." });

    user = new User({
      firstName,
      lastName,
      phoneNumber,
      password,
    });

    user.save();

    return res.status(201).json({
      success: true,
      user,
      message: "You are successfully registered.",
    });
  });
});

// router.post("/withEmail", async (req, res) => {
//   try {
//     const { firstName, lastName, email, birthdate, phoneNumber, password } =
//       req.body;

//     if (!firstName || !password || !email)
//       return res.status(422).json({ message: "is required." });

//     let user = await User.findOne({ email });

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       birthdate,
//       password,
//     });
//     await user.save();

//     return res.status(201).json({
//       success: true,
//       user,
//       message: "You are successfully registered.",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.post("/withPhoneNumber", async (req, res) => {
//   try {
//     const { firstName, lastName, phoneNumber, password } = req.body;

//     if (!firstName || !password || !phoneNumber)
//       return res.status(422).json({ message: "is required." });

//     let user = await User.findOne({ phoneNumber });

//     user = new User({
//       firstName,
//       lastName,
//       phoneNumber,
//       password,
//     });
//     await user.save();

//     return res.status(201).json({
//       success: true,
//       user,
//       message: "You are successfully registered.",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

router.post("/login", (req, res, next) => {
  return passport.authenticate("local", (error, user, fail) => {
    if (error) {
      res.status(500).json({ message: error.message });
      return;
    }

    if (!user) {
      res.status(401).json(fail);
      return;
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        res.status(500).json({ message: error.message });
        return;
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ user: req.user, token });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Session has been destroyed." });
});

module.exports = router;
