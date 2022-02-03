import React, { Component } from "react";
import Getaway1 from "./Getaway1";
import Getaway2 from "./Getaway2";
import Getaway3 from "./Getaway3";
import Getaway4 from "./Getaway4";
import Getaway5 from "./Getaway5";
import Getaway6 from "./Getaway6";
import "../styles/Wizard.css";

class Wizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
    };
    this.handleStep = this.handleStep.bind(this);
  }

  handleStep = (step) => {
    this.setState({ currentStep: step });
  };

  render() {
    const { currentStep } = this.state;
    return (
      <div className="wizard">
        <div className="wizard__button">
          <button onClick={() => this.handleStep(1)}>
            Destinations for arts & culture
          </button>
          <button onClick={() => this.handleStep(2)}>
            Destinations for outdoor adventure
          </button>
          <button onClick={() => this.handleStep(3)}>Mountain cabins</button>
          <button onClick={() => this.handleStep(4)}>Beach destinations</button>
          <button onClick={() => this.handleStep(5)}>
            Popular destinations
          </button>
          <button onClick={() => this.handleStep(6)}>Unique Stays</button>
        </div>
        <div className="wizard__border"></div>
        {currentStep === 1 && <Getaway1 currentStep={currentStep} />}
        {currentStep === 2 && <Getaway2 currentStep={currentStep} />}
        {currentStep === 3 && <Getaway3 currentStep={currentStep} />}
        {currentStep === 4 && <Getaway4 currentStep={currentStep} />}
        {currentStep === 5 && <Getaway5 currentStep={currentStep} />}
        {currentStep === 6 && <Getaway6 currentStep={currentStep} />}
      </div>
    );
  }
}

export default Wizard;
