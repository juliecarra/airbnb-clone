import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "15px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
};

const formStyle = () => {
  return {
    style: {
      width: "400px",
      backgroundColor: "#fbfbfb",
      padding: "5px",
      marginTop: "15px",
    },
  };
};

const buttonStyle = () => {
  return {
    style: {
      marginTop: "15px",
    },
  };
};

class PaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  handleSubmit = (e) => {
    const { stripe, setPaymentToken } = this.props;
    e.preventDefault();

    if (stripe) {
      stripe.createToken().then((payload) => {
        if (payload.error) {
          setPaymentToken(undefined);
          return this.setState({ error: payload.error.message });
        }

        setPaymentToken(payload.token.id);
      });
    } else {
      console.error("Stripe.js hasn't loaded yet!");
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div className="PaymentCheckoutForm">
        <form onSubmit={this.handleSubmit} {...formStyle()}>
          <CardElement {...createOptions()} />
          {error && (
            <div className="alert alert-danger alert-payment">{error}</div>
          )}
          <br />
          <button className="BookingModal__btn--confirm" {...buttonStyle}>
            Validate
          </button>
        </form>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
