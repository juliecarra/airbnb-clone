import React from "react";

const Wizard9 = (props) => {
  const { currentStep, subtitle, handleChange, handleBack, handleClick } =
    props;
  if (currentStep !== 9) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>Name your place</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Attract guests with a listing title that hightlights what makes your
          place special.
        </p>
        <br />
        <input
          type="text"
          className="Wizard__input"
          name="subtitle"
          value={subtitle}
          placeholder="Listing title"
          onChange={handleChange}
        />
      </form>
      {currentStep === 9 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            className="Wizard__button--next"
            disabled={!subtitle}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard9;
