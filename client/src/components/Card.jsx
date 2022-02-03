import React from "react";
import "../styles/Card.css";

function Card({ img, city, km }) {
  return (
    <div className="card">
      <img src={img} alt="" />
      <h1>{city}</h1>
      <p>{km}</p>
    </div>
  );
}

export default Card;
