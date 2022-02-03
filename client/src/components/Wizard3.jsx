import React from "react";

const Wizard3 = (props) => {
  const { baths, handleChange, currentStep, handleClick, handleBack } = props;
  if (currentStep !== 3) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>How many bathrooms?</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Count bathrooms that don't have a shower or bathtub as a half
          bathroom.
        </p>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="baths">Bathrooms</label>
          <input
            type="number"
            className="Wizard__input"
            name="baths"
            value={baths}
            min={1}
            onChange={handleChange}
          />
        </div>
      </form>
      {currentStep === 3 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            class="Wizard__button--next"
            disabled={!baths}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard3;
