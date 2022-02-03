import React, { Component } from "react";
import { connect } from "react-redux";

import { BookingCard, PaymentCard } from "../components/BookingCard";

import * as actions from "../actions/";
import Header from "../components/Header";
import "../styles/Booking.css";

class BookingManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingPayments: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());

    this.getPendingPayments();
  }

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then((pendingPayments) => this.setState({ pendingPayments }))
      .catch((err) => console.error(err));
  }

  acceptPayment(payment) {
    actions
      .acceptPayment(payment)
      .then((status) => {
        this.getPendingPayments();
      })
      .catch((err) => console.error(err));
  }

  declinePayment(payment) {
    actions
      .declinePayment(payment)
      .then((status) => {
        this.getPendingPayments();
      })
      .catch((err) => console.error(err));
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard booking={booking} key={index} />
    ));
  }

  renderPayments(payments) {
    return payments.map((payment, index) => (
      <PaymentCard
        booking={payment.booking}
        payment={payment}
        paymentBtns={this.renderPaymentButtons}
        key={index}
      />
    ));
  }

  renderPaymentButtons = (payment) => {
    return (
      <div>
        <button
          onClick={() => this.acceptPayment(payment)}
          className="btn btn-success"
        >
          Accept
        </button>{" "}
        <button
          onClick={() => this.declinePayment(payment)}
          className="btn btn-danger"
        >
          Decline
        </button>
      </div>
    );
  };

  render() {
    const { bookings, isFetching } = this.props;
    const { pendingPayments } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Header />
        {isAuthenticated && (
          <section id="userBookings">
            <h2
              className="page-title"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              My Bookings
            </h2>
            <br />
            <div
              className="row"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {this.renderBookings(bookings)}
            </div>
            {!isFetching && bookings.length === 0 && (
              <div className="alert alert-warning">
                You have no bookings yet. Search houses and book your place
                today.
              </div>
            )}
          </section>
        )}
        <br />
        {isAuthenticated && (
          <section id="pendingBookings">
            <h2
              className="page-title"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              My Pending Bookings
            </h2>
            <br />
            <div
              className="row"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {this.renderPayments(pendingPayments)}
            </div>
            {!isFetching && pendingPayments.length === 0 && (
              <div className="alert alert-warning">
                You have no pending bookings currently...
              </div>
            )}
          </section>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookings: state.bookings.bookings,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(BookingManage);
