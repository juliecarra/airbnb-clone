import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withEmail, withPhoneNumber } from "../actions";

import { XIcon } from "@heroicons/react/solid";

import Login from "./Login";

import "../styles/Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      toggled: false,
      tap: false,
      go: false,
      firstName: "",
      lastName: "",
      birthdate: "",
      email: "",
      password: "",
      phoneNumber: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = (value) => {
    this.setState({ phoneNumber: value }, () => {});
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleToggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  handleTap = (e) => {
    e.preventDefault();

    this.setState({ tap: !this.state.tap });
  };

  handleGo = () => {
    this.setState({ go: !this.state.go });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthdate: this.state.birthdate,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        password: this.state.password,
      };

      await this.props.withEmail(userData, this.props.history);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
      };

      await this.props.withPhoneNumber(userData, this.props.history);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      birthdate,
      email,
      password,
      phoneNumber,
      clicked,
      toggled,
      tap,
      go,
      message,
    } = this.state;
    return (
      <>
        {!clicked && (
          <div className="Signup">
            <div className="Signup__container">
              {!toggled ? (
                <div className="Signup__content fadeInBottom">
                  <br />
                  <div className="Signup__heading">
                    <XIcon
                      className="Signup__icon"
                      onClick={this.handleClick}
                    />
                    <h1>Sign up</h1>
                  </div>
                  <br />
                  <div className="Signup__border"></div>
                  {!tap ? (
                    <form className="Signup__form">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        placeholder="+33 6 XX XX XX XX"
                        value={phoneNumber}
                        onChange={this.handleChange}
                      />
                      <br />
                      <button
                        className="Signup__submit"
                        onClick={this.handleTap}
                      >
                        Continue
                      </button>
                      <br />
                      <span>or</span>
                      <br />
                      <button
                        className="Signup__button"
                        onClick={this.handleToggle}
                      >
                        Continue with email
                      </button>
                      <p
                        style={{
                          color: "#222",
                        }}
                      >
                        Already have an account ?{" "}
                        <Link
                          to=""
                          onClick={this.handleGo}
                          style={{
                            color: "rgb(34, 34, 34)",
                            textDecoration: "underline",
                          }}
                        >
                          Log in
                        </Link>
                      </p>
                      {go && <Login />}
                    </form>
                  ) : (
                    <form className="Signup__form">
                      {!phoneNumber && message && <p>Phone number {message}</p>}
                      <input
                        className="Signup__input"
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="First name"
                        onChange={this.handleOnChange}
                      />
                      <input
                        className="Signup__input"
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Last name"
                        onChange={this.handleOnChange}
                      />
                      {!firstName && message && <p>First name {message} </p>}
                      <br />
                      <input
                        className="Signup__input"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleOnChange}
                      />
                      {!password && message && <p>Password {message} </p>}
                      <br />
                      <button
                        type="submit"
                        className="Signup__submit"
                        onClick={this.handleOnSubmit}
                      >
                        Sign up
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="Signup__content--2 fadeInBottom">
                  <br />
                  <div className="Signup__heading">
                    <XIcon
                      className="Signup__icon"
                      onClick={this.handleClick}
                    />
                    <h1>Sign up</h1>
                  </div>
                  <br />
                  <div className="Signup__border"></div>
                  <form className="Signup__form">
                    <input
                      className="Signup__input"
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder="First name"
                      onChange={this.handleOnChange}
                    />
                    <input
                      className="Signup__input"
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder="Last name"
                      onChange={this.handleOnChange}
                    />
                    {!firstName && message && (
                      <p style={{ color: "red" }}>First name {message} </p>
                    )}
                    <br />
                    <input
                      className="Signup__input"
                      type="date"
                      name="birthdate"
                      value={birthdate}
                      placeholder="Birthdate"
                      onChange={this.handleOnChange}
                    />

                    <br />
                    <input
                      className="Signup__input"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleOnChange}
                    />
                    {!email && message && (
                      <p style={{ color: "red" }}>Email {message} </p>
                    )}
                    <br />
                    <input
                      className="Signup__input"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={this.handleOnChange}
                    />
                    {!password && message && (
                      <p style={{ color: "red" }}>Password {message} </p>
                    )}
                    <br />
                    <button
                      type="submit"
                      className="Signup__submit"
                      onClick={this.handleSubmit}
                    >
                      Continue
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

Signup.propTypes = {
  withEmail: PropTypes.func.isRequired,
  withPhoneNumber: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  withEmail,
  withPhoneNumber,
})(withRouter(Signup));
