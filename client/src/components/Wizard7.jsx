import React from "react";

const Wizard7 = (props) => {
  const {
    currentStep,
    image,
    imageName,
    handleImageUpload,
    handleBack,
    handleClick,
  } = props;
  if (currentStep !== 7) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>Add photos to your listing</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Photos help guests imagine staying in your place. You can start with
          one and add more after you publish.
        </p>
        <br />
        <label htmlFor="image">House picture</label>
        <label className="file">
          <input
            type="file"
            id="file"
            name="image"
            onChange={handleImageUpload}
          />
          <span className="file-custom">{imageName}</span>
        </label>
      </form>
      {currentStep === 7 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            className="Wizard__button--next"
            disabled={!image}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard7;
