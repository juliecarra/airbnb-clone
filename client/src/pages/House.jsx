import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchHouseById } from "../actions";
import Header from "../components/Header";
import HouseInfo from "../components/HouseInfo";

import "../styles/House.css";
import Booking from "../components/Booking";
import HouseMap from "../components/HouseMap";

class House extends Component {
  componentDidMount() {
    const houseId = this.props.match.params.id;
    this.props.fetchHouseById(houseId);
  }
  render() {
    const { house } = this.props;
    const { image } = house;

    return (
      <div className="House">
        <Header />
        <div className="House__content">
          <div className="House__header"></div>
          <div className="House__span">
            {/* <span className="House__reviews">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "14px",
                  width: "14px",
                  fill: "#460479",
                }}
              >
                <path
                  d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              {reviews} avg ({reviews && reviews.length}{" "}
              {reviews && reviews.length !== 1 ? "reviews" : "review"})
            </span>{" "} */}
            <br />
          </div>
          <div className="House__container--map--img">
            <div className="House__img">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="House__info">
            <div className="House--left">
              <HouseInfo house={house} />
            </div>
            <div className="House--right">
              <Booking house={house} />
            </div>
            <br />
          </div>
          <div className="HouseInfo__border--map "></div>
          <h3>Where you'll be</h3>
          <HouseMap location={`${house.town}`} />
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    house: state.house.house,
  };
};

export default connect(mapStateToProps, { fetchHouseById })(House);
