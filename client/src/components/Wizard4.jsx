import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class Wizard4 extends Component {
  render() {
    const {
      address,
      town,
      area,
      country,
      handleChange,
      handleSelectCountry,
      handleSelectRegion,
      currentStep,
      handleClick,
      handleBack,
    } = this.props;

    if (currentStep !== 4) {
      return null;
    }
    return (
      <div className="Wizard">
        <h1>Where's your place located?</h1>
        <form className="Wizard__form">
          <p style={{ color: "#222", marginLeft: "0px" }}>
            Guests will only get your exact address once they've booked a
            reservation.
          </p>
          <br />

          <label htmlFor="address">Address</label>

          <input
            type="text"
            className="Wizard__input"
            name="address"
            value={address}
            placeholder="Address"
            onChange={handleChange}
          />
          <label htmlFor="town">Town</label>

          <input
            type="text"
            className="Wizard__input"
            name="town"
            value={town}
            placeholder="Town"
            onChange={handleChange}
          />
          <CountryDropdown
            className="Wizard__input"
            value={country}
            onChange={handleSelectCountry}
          />
          <RegionDropdown
            className="Wizard__input"
            disableWhenEmpty={true}
            country={country}
            value={area}
            onChange={handleSelectRegion}
          />
        </form>
        {currentStep === 4 && (
          <div className="Wizard__button">
            <button class="Wizard__button--back" onClick={handleBack}>
              Back
            </button>
            <button
              class="Wizard__button--next"
              disabled={!address || !town || !area || !country}
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Wizard4;
