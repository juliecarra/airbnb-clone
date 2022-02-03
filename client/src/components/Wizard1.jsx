import React from "react";
import data from "../data/title.json";
import houseTypeData from "../data/houseType.json";

const Wizard1 = (props) => {
  const {
    currentStep,
    title,
    houseType,

    handleChange,
    handleClick,
  } = props;
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div className="Wizard">
      <h1>What kind of place are you listing?</h1>
      <form className="Wizard__form">
        <label htmlFor="title">First, let's narrow things down</label>

        <select
          className="Wizard__input"
          name="title"
          value={title}
          onChange={handleChange}
        >
          <option value="" selected disabled hidden>
            Select one
          </option>
          {data.map((data) => (
            <option key={data.number} value={data.title}>
              {data.title}
            </option>
          ))}
        </select>

        <label htmlFor="houseType">Now choose a property type</label>

        <select
          className="Wizard__input"
          name="houseType"
          value={houseType}
          onChange={handleChange}
        >
          <option value="" selected disabled hidden>
            Select property type
          </option>
          {houseTypeData.map((houseType) => (
            <option key={houseType.number} value={houseType.value}>
              {houseType.value}
            </option>
          ))}
        </select>
      </form>
      {currentStep === 1 && (
        <div className="Wizard__button">
          <button
            className="Wizard__button--back"
            style={{ visibility: "hidden" }}
          ></button>
          <button
            className="Wizard__button--next"
            disabled={!title || !houseType}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard1;
