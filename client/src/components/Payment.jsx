import React, { Component } from "react";
import { Elements } from "react-stripe-elements";

import PaymentForm from "./PaymentForm";

class Payment extends Component {
  render() {
    return (
      <div className="Payment">
        <Elements>
          <PaymentForm {...this.props} />
        </Elements>
      </div>
    );
  }
}

export default Payment;
