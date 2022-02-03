import React from "react";

const Wizard10 = (props) => {
  const {
    houseRules,
    handleRules,

    currentStep,
    handleClick,
    handleBack,
  } = props;
  if (currentStep !== 10) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>Set house rules for your guests</h1>
      <form className="Wizard__form">
        <p style={{ color: "#222", marginLeft: "0px" }}>
          Guests must agree to your house rules before book.
        </p>
        <br />
        <div>
          <input
            type="checkbox"
            id="Suitable for children (2-12 years)"
            value="Suitable for children (2-12 years)"
            onChange={handleRules}
          />{" "}
          <label htmlFor="Suitable for children (2-12 years)">
            Suitable for children (2-12 years)
          </label>
          <br />
          <input
            type="checkbox"
            id="Suitable for infants (Under 2 years)"
            value="Suitable for infants (Under 2 years)"
            onChange={handleRules}
          />{" "}
          <label htmlFor="Suitable for infants (Under 2 years)">
            Suitable for infants (Under 2 years)
          </label>
          <br />
          <input
            type="checkbox"
            id="Suitable for pets"
            value="Suitable for pets"
            onChange={handleRules}
          />{" "}
          <label htmlFor="Suitable for pets">Suitable for pets</label>
          <br />
          <input
            type="checkbox"
            id="Smoking allowed"
            value="Smoking allowed"
            onChange={handleRules}
          />{" "}
          <label htmlFor="Smoking allowed">Smoking allowed</label>
          <br />
          <input
            type="checkbox"
            id="Events or parties allowed"
            value="Events or parties allowed"
            onChange={handleRules}
          />{" "}
          <label htmlFor="Events or parties allowed">
            Events or parties allowed
          </label>
        </div>
        <br />

        <br />
      </form>
      {currentStep === 10 && (
        <div className="Wizard__button">
          <button class="Wizard__button--back" onClick={handleBack}>
            Back
          </button>
          <button
            class="Wizard__button--confirm"
            style={{
              backgroundColor: "#00a2c7",
              color: "#fff",
              fontWeight: 600,
            }}
            disabled={!houseRules}
            onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard10;
