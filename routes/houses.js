const express = require("express");
const passport = require("passport");
const axios = require("axios");
const router = new express.Router();

const User = require("../models/User");
const House = require("../models/House");

const uploader = require("../configs/cloudinary");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        town,
        area,
        country,
        location,
        guests,
        bedrooms,
        beds,
        baths,
        price,
        address,
        houseType,
        houseRules,
        services,
        description,
      } = req.body;

      const image = req.file;

      const newHouse = new House({
        title,
        town,
        area,
        country,
        location,
        guests,
        bedrooms,
        beds,
        baths,
        price,
        address,
        houseType,
        houseRules,
        services,
        description,
        image,
        user: req.user._id,
      });

      if (req.file) newHouse.image = req.file.secure_url;

      User.updateOne(
        { _id: req.user._id },
        { $push: { houses: newHouse } },
        function () {}
      );
      const house = await newHouse.save();
      return res.status(200).json(house);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/manage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user.id;

    try {
      const houses = await House.where({ user }).populate("bookings");

      if (!houses) {
        return res.status(404).json({ message: "No houses have been found." });
      }
      return res.status(200).json(houses);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const town = req.query.town || {};

    const findByQuery = town
      ? House.find({ town: town.toLowerCase() })
      : House.find({});

    let houses = await findByQuery.sort({ date: -1 }).select("-bookings");

    if (town) {
      houses = houses.filter((house) => {
        return house.town === town.toLowerCase();
      });
    }

    return res.status(200).json(houses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await House.findById(req.params.id)
      .populate("user", "firstName -_id")
      .populate("bookings", "checkIn checkOut  -_id");

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }
    return res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const house = await House.findById(req.params.id);

      //If house doesn't exist
      if (!house) {
        res.status(404).json({ msg: "House not found" });
      }
      //Check user
      if (house.user.toString() !== req.user.id) {
        res.status(404).json({ msg: "User not authorized" });
      }

      //Check booking on this house
      if (house.bookings.length > 0) {
        res
          .status(404)
          .json({ msg: "Cannot delete house with active bookings!" });
      }
      await house.remove();
      res.json({ msg: "house removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
