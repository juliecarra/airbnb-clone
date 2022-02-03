import React from "react";

function Getaway2({ currentStep }) {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Lake Martin
        <br /> <span>Alabama</span>
      </p>
      <p>
        Banff
        <br />
        <span>Alberta</span>
      </p>
      <p>
        Nerja
        <br />
        <span>Andalucía</span>
      </p>
      <p>
        Greer
        <br /> <span>Arizona</span>
      </p>
      <p>
        Lake Havasu City
        <br /> <span>Arizona</span>
      </p>
      <p>
        Lake Powell <br />
        <span>Arizona</span>
      </p>
      <p>
        North Rim
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Payson
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Pinetop-Lakeside
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Red Rock
        <br /> <span>Arizona</span>
      </p>
      <p>
        Dinner Plain
        <br />
        <span>Australia</span>
      </p>
      <p>
        <button>Show more</button>
      </p>
    </div>
  );
}

export default Getaway2;
