import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { hostHouse } from "../actions/";

import "../styles/Host.css";

import Wizard1 from "../components/Wizard1";
import Wizard2 from "../components/Wizard2";
import Wizard3 from "../components/Wizard3";
import Wizard4 from "../components/Wizard4";
import Header from "../components/Header";
import Wizard5 from "../components/Wizard5";
import Wizard6 from "../components/Wizard6";
import Wizard7 from "../components/Wizard7";
import Wizard8 from "../components/Wizard8";
import Wizard9 from "../components/Wizard9";
import Wizard10 from "../components/Wizard10";

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      totalSteps: 10,
      title: "",
      subtitle: "",
      image: "",
      imageName: "",
      description: "",
      town: "",
      area: "",
      country: "",
      address: "",
      price: 0,
      guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      services: [],
      amenities: [],
      houseType: "",
      houseRules: [],
      message: "",
    };
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.handleRules = this.handleRules.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
  }
  handleNextStep = () => {
    this.setState((prevState) => {
      return {
        currentStep: prevState.currentStep + 1,
      };
    });
  };

  handlePreviousStep = () => {
    this.setState((prevState) => {
      return {
        currentStep: prevState.currentStep - 1,
      };
    });
  };

  progressBar = () => {
    return (100 / this.state.totalSteps) * this.state.currentStep;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageUpload(e) {
    const image = e.target.files[0];
    this.setState({ image });

    const imageName = e.target.files[0].name;
    this.setState({ imageName });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", this.state.title);
      formData.append("subtitle", this.state.subtitle);
      formData.append("description", this.state.description);
      formData.append("image", this.state.image, this.state.imageName);
      formData.append("address", this.state.address);
      formData.append("town", this.state.town);
      formData.append("area", this.state.area);
      formData.append("country", this.state.country);
      formData.append("price", this.state.price);
      formData.append("guests", this.state.guests);
      formData.append("bedrooms", this.state.bedrooms);
      formData.append("beds", this.state.beds);
      formData.append("baths", this.state.baths);
      formData.append("services", this.state.services);
      formData.append("amenities", this.state.amenities);
      formData.append("houseType", this.state.houseType);
      formData.append("houseRules", this.state.houseRules);

      await this.props.hostHouse(formData, this.props.history);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  handleCheckboxChange = (event) => {
    let newArray = [...this.state.amenities, event.target.id];
    if (this.state.amenities.includes(event.target.id)) {
      newArray = newArray.filter((amenity) => amenity !== event.target.id);
    }
    this.setState({
      amenities: newArray,
    });
  };

  handleServices = (event) => {
    let newArray = [...this.state.services, event.target.id];
    if (this.state.services.includes(event.target.id)) {
      newArray = newArray.filter((service) => service !== event.target.id);
    }
    this.setState({
      services: newArray,
    });
  };

  handleRules = (event) => {
    let newArray = [...this.state.houseRules, event.target.id];
    if (this.state.houseRules.includes(event.target.id)) {
      newArray = newArray.filter((houseRule) => houseRule !== event.target.id);
    }
    this.setState({
      houseRules: newArray,
    });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ area: val });
  }

  render() {
    const {
      currentStep,
      title,
      subtitle,
      image,
      imageName,
      description,
      address,
      town,
      area,
      country,
      price,
      bedrooms,
      guests,
      beds,
      baths,
      services,
      amenities,
      houseType,
      houseRules,
      message,
    } = this.state;

    return (
      <div className="Host">
        <Header />
        <progress
          className="Host__progressBar"
          value={this.progressBar()}
          max="100"
        >
          {this.progressBar()}
        </progress>

        <Wizard1
          currentStep={currentStep}
          title={title}
          houseType={houseType}
          handleChange={this.handleChange}
          handleClick={this.handleNextStep}
        />

        <Wizard2
          currentStep={currentStep}
          guests={guests}
          bedrooms={bedrooms}
          beds={beds}
          price={price}
          handleChange={this.handleChange}
          handleClick={this.handleNextStep}
          handleBack={this.handlePreviousStep}
        />

        <Wizard3
          currentStep={currentStep}
          baths={baths}
          handleChange={this.handleChange}
          handleClick={this.handleNextStep}
          handleBack={this.handlePreviousStep}
        />

        <Wizard4
          currentStep={currentStep}
          address={address}
          town={town}
          area={area}
          country={country}
          handleChange={this.handleChange}
          handleSelectCountry={this.selectCountry}
          handleSelectRegion={this.selectRegion}
          handleClick={this.handleNextStep}
          handleBack={this.handlePreviousStep}
        />
        <Wizard5
          currentStep={currentStep}
          amenities={amenities}
          handleCheckboxChange={this.handleCheckboxChange}
          handleClick={this.handleNextStep}
          handleBack={this.handlePreviousStep}
        />
        <Wizard6
          currentStep={currentStep}
          services={services}
          handleServices={this.handleServices}
          handleClick={this.handleNextStep}
          handleBack={this.handlePreviousStep}
        />
        <Wizard7
          currentStep={currentStep}
          image={image}
          imageName={imageName}
          handleImageUpload={this.handleImageUpload}
          handleChange={this.handleChange}
          handleBack={this.handlePreviousStep}
          handleClick={this.handleNextStep}
        />
        <Wizard8
          currentStep={currentStep}
          description={description}
          handleChange={this.handleChange}
          handleBack={this.handlePreviousStep}
          handleClick={this.handleNextStep}
        />
        <Wizard9
          currentStep={currentStep}
          subtitle={subtitle}
          handleChange={this.handleChange}
          handleBack={this.handlePreviousStep}
          handleClick={this.handleNextStep}
        />
        <Wizard10
          currentStep={currentStep}
          houseRules={houseRules}
          handleChange={this.handleChange}
          handleRules={this.handleRules}
          handleClick={this.handleSubmit}
          handleBack={this.handlePreviousStep}
        />
        <p style={{ color: "red" }}>{message}</p>
      </div>
    );
  }
}

Host.propTypes = {
  hostHouse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
  };
};

export default connect(mapStateToProps, { hostHouse })(withRouter(Host));
