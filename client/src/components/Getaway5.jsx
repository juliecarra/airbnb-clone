import React from "react";

function Getaway5({ currentStep }) {
  if (currentStep !== 5) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Canmore
        <br /> <span>Alberta</span>
      </p>
      <p>
        Benalmadena
        <br />
        <span>Andalusia</span>
      </p>
      <p>
        Marbella
        <br />
        <span>Andalusia</span>
      </p>
      <p>
        Mijas <br />
        <span>Andalusia</span>
      </p>
      <p>
        Prescott
        <br /> <span>Arizona</span>
      </p>
      <p>
        Scottsdale
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Tucson
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Jasper
        <br />
        <span>Arkansas</span>
      </p>
      <p>
        Mountain View
        <br />
        <span>Arkansas</span>
      </p>
      <p>
        Devonport
        <br /> <span>Australia</span>
      </p>
      <p>
        Mallacoota
        <br />
        <span>Australia</span>
      </p>
      <p>
        <button>Show more</button>
      </p>
    </div>
  );
}

export default Getaway5;
