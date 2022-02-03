import React, { Component } from "react";
import { Link } from "react-router-dom";

import { fetchUserHouses } from "../actions/";
import { connect } from "react-redux";

import Header from "../components/Header";
import ManageHouseItem from "../components/ManageHouseItem";

class ManageHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    this.props.fetchUserHouses();
    this.setState({ isFetching: false });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isFetching } = this.state;
    const { houses } = this.props;

    return (
      <div>
        <Header />
        {isAuthenticated && (
          <div>
            <br />
            <div className="row">
              {houses.map((house, index) => (
                <ManageHouseItem key={index} house={house} houseIndex={index} />
              ))}
            </div>

            {!isFetching && houses.length === 0 && (
              <div style={{ marginLeft: "20px" }}>
                If you want to advertised your property please follow this link.
                <Link
                  style={{ marginLeft: "10px" }}
                  className="btn"
                  to="/houses/host"
                >
                  Register your House
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  houses: state.houses.houses,
});

export default connect(mapStateToProps, {
  fetchUserHouses,
})(ManageHouse);
