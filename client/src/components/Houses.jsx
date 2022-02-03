import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchHouses } from "../actions";
import { connect } from "react-redux";

import HouseItem from "./HouseItem";

class Houses extends Component {
  componentDidMount() {
    this.props.fetchHouses();
  }

  render() {
    const { houses } = this.props;
    return (
      <div style={{ width: "100%" }}>
        {houses.map((house, i) => (
          <div key={i}>
            <HouseItem house={house} />
          </div>
        ))}
      </div>
    );
  }
}

Houses.propTypes = {
  fetchHouses: PropTypes.func.isRequired,
  houses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
  };
};

export default connect(mapStateToProps, { fetchHouses })(Houses);
