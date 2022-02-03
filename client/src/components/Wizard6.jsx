import React from "react";

const Wizard6 = (props) => {
  const { services, handleServices, currentStep, handleClick, handleBack } =
    props;
  if (currentStep !== 6) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>What spaces can guests use?</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Include common areas but don't add spaces that aren't on your
          property.
        </p>
        <br />
        <div>
          <input
            type="checkbox"
            id="Kitchen"
            value="Kitchen"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Kitchen">Kitchen</label>
          <br />
          <input
            type="checkbox"
            id="Gym"
            value="Gym"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Gym">Gym</label>
          <br />
          <input
            type="checkbox"
            id="Pool"
            value="Pool"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Pool">Pool</label>
          <br />
          <input
            type="checkbox"
            id="Parking"
            value="Parking"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Parking">Parking</label>
          <br />
          <input
            type="checkbox"
            id="Hot tub"
            value="Hot tub"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Hot tub">Hot tub</label>
          <br />
          <input
            type="checkbox"
            id="Laundry - washer"
            value="Laundry - washer"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Laundry - washer">Laundry - washer</label>
          <br />
          <input
            type="checkbox"
            id="Laundry - dryer"
            value="Laundry - dryer"
            onChange={handleServices}
          />{" "}
          <label htmlFor="Laundry - dryer">Laundry - dryer</label>
        </div>
      </form>
      <br />
      {currentStep === 6 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            class="Wizard__button--next"
            disabled={!services}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard6;
