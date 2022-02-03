import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions";
import PropTypes from "prop-types";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import "../styles/Dropdown.css";
import { LogoutIcon } from "@heroicons/react/solid";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      toggled: false,
      message: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleToggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  handleLogout = async (e) => {
    try {
      e.preventDefault();
      await this.props.logout(this.props.history);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  render() {
    const { clicked, toggled } = this.state;
    const { isAuthenticated } = this.props.auth;

    const auth = (
      <>
        <div className="dropdown">
          <div className="dropdown__menu">
            <div>
              <Link className="dropdown__item" to="/houses/host">
                Become a host
              </Link>
              <Link className="dropdown__item" to="/houses/manage">
                Manage your houses
              </Link>
              <Link className="dropdown__item" to="/bookings/manage">
                Manage Bookings
              </Link>
              <Link
                className="dropdown__item"
                to="/"
                onClick={this.handleLogout}
              >
                <LogoutIcon />
              </Link>
            </div>
          </div>
        </div>
      </>
    );

    const guest = (
      <>
        {!clicked && !toggled && (
          <div className="dropdown">
            <div className="dropdown__menu">
              <div>
                <Link
                  to=""
                  className="dropdown__item"
                  onClick={this.handleClick}
                >
                  Sign up
                </Link>
                <Link
                  to=""
                  className="dropdown__item"
                  onClick={this.handleToggle}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
        {clicked && <Signup />}
        {toggled && <Login />}
      </>
    );

    return <>{isAuthenticated === true ? auth : guest}</>;
  }
}

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Dropdown));
