import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { login } from "../actions";

import { XIcon } from "@heroicons/react/solid";

import Signup from "./Signup";

import "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
      clicked: false,
      toggled: false,
      tap: false,
      go: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnChange = (value) => {
    this.setState({ email: value }, () => {});
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
        email: this.state.email,
        password: this.state.password,
      };

      await this.props.login(userData, this.props.history);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  render() {
    const { email, password, message, clicked, toggled, tap, go } = this.state;
    return (
      <>
        {!clicked && (
          <div className="Login">
            <div className="Login__container">
              {!toggled ? (
                <div className="Login__content fadeInBottom">
                  <br />
                  <div className="Login__heading">
                    <XIcon className="Login__icon" onClick={this.handleClick} />
                    <h1>Log in</h1>
                  </div>
                  <br />
                  <div className="Login__border"></div>
                  {!tap ? (
                    <form className="Login__form">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        placeholder="+33 6 XX XX XX XX"
                        value={email}
                        onChange={this.handleOnChange}
                      />

                      <br />
                      <button
                        className="Login__submit"
                        onClick={this.handleTap}
                      >
                        Continue
                      </button>
                      <br />
                      <span>or</span>
                      <br />
                      <button
                        className="Login__button"
                        onClick={this.handleToggle}
                      >
                        Continue with email
                      </button>
                      <p
                        style={{
                          color: "#222",
                        }}
                      >
                        Don’t have an account ?{" "}
                        <Link
                          onClick={this.handleGo}
                          style={{
                            color: "rgb(34, 34, 34)",
                            textDecoration: "underline",
                          }}
                        >
                          Sign up
                        </Link>
                      </p>
                      {go && <Signup />}
                    </form>
                  ) : (
                    <form className="Login__form">
                      <input
                        className="Login__input"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                      />

                      <br />
                      <button
                        type="submit"
                        className="Login__submit"
                        onClick={this.handleSubmit}
                      >
                        Log in
                      </button>
                    </form>
                  )}
                  {message && <p>Error: {message}</p>}
                </div>
              ) : (
                <div className="Login__content--2 fadeInBottom">
                  <br />
                  <div className="Login__heading">
                    <XIcon className="Login__icon" onClick={this.handleClick} />
                    <h1>Log in</h1>
                  </div>
                  <br />
                  <div className="Login__border"></div>
                  <form className="Login__form">
                    <input
                      className="Login__input"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleChange}
                      required
                    />

                    <br />
                    <input
                      className="Login__input"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={this.handleChange}
                    />

                    <br />
                    <button
                      type="submit"
                      className="Login__submit"
                      onClick={this.handleSubmit}
                    >
                      Log in
                    </button>
                  </form>
                  {message && <p style={{ color: "red" }}>Error: {message}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
