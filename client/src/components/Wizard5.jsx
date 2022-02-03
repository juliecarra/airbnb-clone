import React from "react";

const Wizard5 = (props) => {
  const {
    amenities,
    handleCheckboxChange,
    currentStep,
    handleClick,
    handleBack,
  } = props;
  if (currentStep !== 5) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>What amenities do you offer?</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          These are just the amenities guests usually expect, but you can add
          even more after you publish.
        </p>
        <br />
        <div>
          <input
            type="checkbox"
            id="Essentials"
            value="Essentials"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Essentials">Essentials</label>
          <br />
          <input
            type="checkbox"
            id="Air conditioning"
            value="Air conditioning"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Air conditioning">Air conditioning</label>
          <br />
          <input
            type="checkbox"
            id="Heat"
            value="Heat"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Heat">Heat</label>
          <br />
          <input
            type="checkbox"
            id="Hair dryer"
            value="Hair dryer"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Hair dryer">Hair dryer</label>
          <br />
          <input
            type="checkbox"
            id="Closet/drawers"
            value="Closet/drawers"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Closet/drawers">Closet/drawers</label>
          <br />
          <input
            type="checkbox"
            id="Iron"
            value="Iron"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Iron">Iron</label>
          <br />
          <input
            type="checkbox"
            id="TV"
            value="TV"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="TV">TV</label>
          <br />
          <input
            type="checkbox"
            id="Wi-Fi"
            value="Wi-Fi"
            onChange={handleCheckboxChange}
          />{" "}
          <label htmlFor="Wi-Fi">Wi-Fi</label>
        </div>
      </form>
      <br />
      {currentStep === 5 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            class="Wizard__button--next"
            disabled={!amenities}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard5;
