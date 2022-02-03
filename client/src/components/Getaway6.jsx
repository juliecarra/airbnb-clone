import React from "react";

function Getaway6({ currentStep }) {
  if (currentStep !== 6) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Cabins
        <br /> <span>United States</span>
      </p>
      <p>
        Treehouses
        <br />
        <span>United States</span>
      </p>
      <p>
        Glamping
        <br />
        <span>United States</span>
      </p>
      <p>
        Tiny Houses <br />
        <span>United States</span>
      </p>
      <p>
        Beach Houses
        <br /> <span>United States</span>
      </p>
      <p>
        Campers and RVs
        <br />
        <span>United Statesa</span>
      </p>
      <p>
        Lakehouses
        <br />
        <span>United States</span>
      </p>
    </div>
  );
}

export default Getaway6;
