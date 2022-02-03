import React from "react";

const Wizard2 = (props) => {
  const {
    guests,
    beds,
    bedrooms,
    price,
    currentStep,
    handleChange,
    handleClick,
    handleBack,
  } = props;

  if (currentStep !== 2) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>How many guests can your place accomodate?</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Check that you have enough beds to accomodate all your guests
          comfortably.
        </p>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            className="Wizard__input"
            name="guests"
            value={guests}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="bedrooms">How many bedrooms can guests use?</label>
          <input
            type="number"
            className="Wizard__input"
            name="bedrooms"
            value={bedrooms}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="beds">How many beds can guests use?</label>
          <input
            type="number"
            className="Wizard__input"
            name="beds"
            value={beds}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="Wizard__input"
            name="price"
            value={price}
            min={1}
            placeholder="Price"
            onChange={handleChange}
          />
        </div>
      </form>
      {currentStep === 2 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            class="Wizard__button--next"
            disabled={!guests || !bedrooms || !beds || !price}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard2;
