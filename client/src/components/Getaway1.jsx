import React from "react";
import "../styles/Getaway.css";

function Getaway1({ currentStep }) {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Phoenix <br /> <span>Arizona</span>
      </p>
      <p>
        Hot Springs <br />
        <span>Arkansas</span>
      </p>
      <p>
        Los Angeles <br />
        <span>California</span>
      </p>
      <p>
        San Diego <br /> <span>California</span>
      </p>
      <p>
        San Francisco <br /> <span>California</span>
      </p>
      <p>
        Barcelona <br />
        <span>Catalonia</span>
      </p>
      <p>
        Prague <br />
        <span>Czechia</span>
      </p>
      <p>
        Washington <br />
        <span>District of Columbia</span>
      </p>
      <p>
        Keswick <br />
        <span>England</span>
      </p>
      <p>
        London <br /> <span>England</span>
      </p>
      <p>
        Scarborough <br />
        <span>England</span>
      </p>
      <p>
        <button>Show more</button>
      </p>
    </div>
  );
}

export default Getaway1;
