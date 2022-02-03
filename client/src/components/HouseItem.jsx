import React from "react";
import { Link } from "react-router-dom";

import { HeartIcon } from "@heroicons/react/solid";

import "../styles/HouseItem.css";

function HouseItem({ house }) {
  const {
    image,
    subtitle,
    houseType,
    town,
    country,
    title,
    guests,
    bedrooms,
    beds,
    baths,
    price,
  } = house;
  return (
    <div className="houseItem">
      <div className="houseItem__img">
        <Link
          to={"/houses/" + house._id}
          style={{ textDecoration: "none", color: "#222" }}
        >
          {" "}
          <img src={image} alt="" />{" "}
        </Link>
      </div>
      <div className="houseItem__container">
        <div className="houseItem__info">
          <p>
            {" "}
            {subtitle || houseType} in {town}, {country}
          </p>
          <HeartIcon />
        </div>
        <h4>{title}</h4>
        <div className="houseItem__border"></div>
        <p className="houseItem__description">
          {" "}
          {guests} {guests === 1 ? "guest" : "guests"} • {bedrooms}{" "}
          {bedrooms === 1 ? "bedroom" : "bedrooms"} • {beds}
          {beds === 1 ? "bed" : "beds"} • {baths}{" "}
          {baths === 1 ? "bath" : "baths"}
        </p>

        <div>
          <p className="houseItem__price">€{price} / night</p>
        </div>
      </div>
    </div>
  );
}

export default HouseItem;
