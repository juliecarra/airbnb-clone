import React from "react";

function Getaway3({ currentStep }) {
  if (currentStep !== 3) {
    return null;
  }
  return (
    <div className="getaway">
      <p>
        Mentone
        <br /> <span>Alabama</span>
      </p>
      <p>
        Sedona
        <br />
        <span>Arizona</span>
      </p>
      <p>
        Helen
        <br />
        <span>Georgia</span>
      </p>
      <p>
        Pine Mountain
        <br /> <span>Georgia</span>
      </p>
      <p>
        Stone Mountain
        <br /> <span>Georgia</span>
      </p>
      <p>
        Island Park <br />
        <span>Idaho</span>
      </p>
      <p>
        Blue Mountains
        <br />
        <span>New South Wales</span>
      </p>
      <p>
        Asheville
        <br />
        <span>North Carolina</span>
      </p>
      <p>
        Blowing Rock
        <br />
        <span>North Carolina</span>
      </p>
      <p>
        Boone
        <br /> <span>North Carolina</span>
      </p>
      <p>
        Hochatown
        <br />
        <span>Oklahoma</span>
      </p>
      <p>
        <button>Show more</button>
      </p>
    </div>
  );
}

export default Getaway3;
