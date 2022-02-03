import React from "react";

function Getaway4({ currentStep }) {
  if (currentStep !== 4) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Dauphin Island
        <br /> <span>Alabama</span>
      </p>
      <p>
        Fort Morgan
        <br />
        <span>Alabama</span>
      </p>
      <p>
        Gulf Shores
        <br />
        <span>Alabama</span>
      </p>
      <p>
        Bruny Island
        <br /> <span>Australia</span>
      </p>
      <p>
        Crescent Head
        <br /> <span>Australia</span>
      </p>
      <p>
        Gerringong
        <br />
        <span>Australia</span>
      </p>
      <p>
        Hamilton Island
        <br />
        <span>Australia</span>
      </p>
      <p>
        Lancelin
        <br />
        <span>Australia</span>
      </p>
      <p>
        Melbourne Beach
        <br />
        <span>Australia</span>
      </p>
      <p>
        Moonta Bay
        <br /> <span>Australia</span>
      </p>
      <p>
        Ocean Grove
        <br />
        <span>Australia</span>
      </p>
      <p>
        <button>Show more</button>
      </p>
    </div>
  );
}

export default Getaway4;
