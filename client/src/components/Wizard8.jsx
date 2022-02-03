import React from "react";

const Wizard8 = (props) => {
  const { currentStep, description, handleChange, handleBack, handleClick } =
    props;
  if (currentStep !== 8) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>Describe your place to guests</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Write a quick summary of your place. You can highlight what's special
          about your space, the neighborhood, and how you'll interact with
          guests.
        </p>
        <br />
        <label htmlFor="description">House description</label>

        <textarea
          name="description"
          value={description}
          className="Wizard__input"
          placeholder="Description"
          cols="30"
          rows="10"
          style={{
            height: "calc(1.5em + 0.75rem + 2px)",
            fontFamily: "inherit",
          }}
          onChange={handleChange}
        ></textarea>
      </form>
      {currentStep === 8 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            className="Wizard__button--next"
            disabled={!description}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard8;
