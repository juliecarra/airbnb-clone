import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchHouses } from "../actions";
import { connect } from "react-redux";
import Header from "../components/Header";

import "../styles/Search.css";
import Houses from "../components/Houses";
import Map from "../components/Map";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      town: this.props.match.params.town,
    };
  }

  async componentDidMount() {
    this.searchHousesByTown();
  }

  searchHousesByTown = () => {
    const { town } = this.state;
    this.setState({ town });
    this.props.fetchHouses(town);
  };

  render() {
    const { town } = this.state;
    const { houses } = this.props;

    let noResults = (
      <div className="search">
        <Header />
        <div className="search__container">
          <p>No Airbnb results for {town}</p>
          <p>
            Try adjusting your search by changing your location (eg. Paris).
          </p>
        </div>
      </div>
    );

    let results = (
      <div className="search">
        <Header />
        <div className="search__container">
          <p>
            {houses.length} stays in{" "}
            {town.charAt(0).toUpperCase() + town.slice(1)}
          </p>
          <p>
            Review COVID-19 travel restrictions before you book.{" "}
            <span>Learn more</span>
          </p>
        </div>
        <div className="search__component">
          <Houses />
          <div className="search__container--2">
            <Map />
          </div>
        </div>
      </div>
    );
    return <div>{houses.length > 0 ? results : noResults}</div>;
  }
}

Search.propTypes = {
  fetchHouses: PropTypes.func.isRequired,
  houses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
  };
};

export default connect(mapStateToProps, { fetchHouses })(Search);
