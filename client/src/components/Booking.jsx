import React, { Component } from "react";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import * as moment from "moment";
import PropTypes from "prop-types";

import { createBooking } from "../actions/";
import { getRangeOfDates } from "../helpers/";

import BookingPrice from "./BookingPrice";
import Login from "../pages/Login";
import BookingModal from "./BookingModal";
import Payment from "./Payment";

// import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";

import "../styles/Booking.css";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.dateRef = React.createRef();
    this.bookedOutDates = [];
    this.state = {
      clicked: false,
      reserved: false,
      selected: false,
      date: "",
      selectedBooking: {
        checkIn: "",
        checkOut: "",
        guests: "",
        paymentToken: "",
      },
      modal: {
        open: false,
      },
      message: "",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.confirmReservation = this.confirmReservation.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.setPaymentToken = this.setPaymentToken.bind(this);
  }

  componentDidMount() {
    this.getBookedOutDates();
  }

  handleOnClick = () => {
    this.setState({ reserved: !this.state.reserved });
  };

  handleSelected = () => {
    this.setState({ selected: !this.state.selected });
  };

  getBookedOutDates() {
    const { bookings } = this.props.house;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking) => {
        const dateRange = getRangeOfDates(
          booking.checkIn,
          booking.checkOut,
          "Y/MM/DD"
        );

        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  handleInvalidDates = (date) => {
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  };

  handleEvent(event, picker) {
    const checkIn = picker.startDate.format("Y/MM/DD");
    const checkOut = picker.endDate.format("Y/MM/DD");

    this.dateRef.current.value = checkIn + " - " + checkOut;

    this.setState({
      date: checkIn,
      checkOut,
      selectedBooking: {
        ...this.state.selectedBooking,
        checkIn,
        checkOut,
      },
    });
  }

  handleOnChange = (e) => {
    this.setState({
      selectedBooking: {
        ...this.state.selectedBooking,
        guests: parseInt(e.target.value),
      },
    });
  };

  confirmReservation = () => {
    const { checkIn, checkOut } = this.state.selectedBooking;

    const days = getRangeOfDates(checkIn, checkOut).length - 1;

    const { house } = this.props;

    this.setState({
      modal: { open: true },
      clicked: !this.state.clicked,
      selectedBooking: {
        ...this.state.selectedBooking,
        days,
        totalPrice: days * house.price,
        house,
      },
    });
  };

  cancelReservation = () => {
    this.setState({ modal: { open: false } });
  };

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.checkIn, booking.checkOut);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    this.dateRef.current.value = "";

    this.setState({ selectedBooking: { guests: "" } });
  }

  handleReservation = async () => {
    try {
      await toast.success("Booking has been succesfully created! Enjoy.");

      const booking = await this.props.createBooking(
        this.state.selectedBooking,
        this.props.history
      );

      this.cancelReservation();
      this.resetData();
      this.setState({ modal: { open: false } });

      await this.addNewBookedOutDates(booking);
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  };

  setPaymentToken(paymentToken) {
    const { selectedBooking } = this.state;
    selectedBooking.paymentToken = paymentToken;

    this.setState({ selectedBooking });
  }

  render() {
    const { clicked, reserved, selected } = this.state;
    const { house } = this.props;
    const { isAuthenticated } = this.props.auth;

    const { checkIn, checkOut, guests, paymentToken } =
      this.state.selectedBooking;

    const guest = (
      <div className="Booking__guest">
        {!clicked ? (
          <>
            <h2 className="Booking__title">Add dates for prices</h2>
            {/* <div className="HouseItem__span">
              <span className="HouseItem__reviews">
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
              </span>
            </div> */}
            <br />
            <form className="Booking__form">
              <div className="Booking__container">
                <label htmlFor="dates">Dates</label>
                <DateRangePicker
                  isInvalidDate={this.handleInvalidDates}
                  onEvent={this.handleEvent}
                  opens="left"
                  containerStyles={{ display: "block" }}
                >
                  <input
                    ref={this.dateRef}
                    id="dates"
                    type="text"
                    className="form-control"
                    placeholder="Check in — Check out"
                  ></input>
                </DateRangePicker>
              </div>
              <div className="Booking__container">
                <label htmlFor="guests">Guests</label>
                <input
                  value={guests}
                  onChange={this.handleOnChange}
                  type="number"
                  className="form-control"
                  id="guests"
                  aria-describedby="guests"
                  placeholder="0"
                  min="1"
                  max="100"
                />
              </div>
            </form>
            <br />
            <button
              className="Booking__button"
              disabled={!checkIn || !checkOut || !guests}
              onClick={this.confirmReservation}
            >
              Check availability
            </button>
            <p className="info">
              Enter dates and number of guests to see the total trip price.
              Tourism taxes may be added.
            </p>
          </>
        ) : (
          <>
            <BookingPrice
              house={house}
              booking={this.state.selectedBooking}
              onClick={this.handleOnClick}
            />
          </>
        )}
        {reserved && <Login />}
      </div>
    );

    const auth = (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="Booking__guest">
          {!clicked ? (
            <>
              <h2 className="Booking__title">Add dates for prices</h2>
              {/* <div className="HouseItem__span">
                <span className="HouseItem__reviews">
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
                </span>
              </div> */}
              <br />
              <form className="Booking__form">
                <div className="Booking__container">
                  <label htmlFor="dates">Dates</label>
                  <DateRangePicker
                    isInvalidDate={this.handleInvalidDates}
                    onEvent={this.handleEvent}
                    opens="left"
                    containerStyles={{ display: "block" }}
                  >
                    <input
                      ref={this.dateRef}
                      id="dates"
                      type="text"
                      className="form-control"
                      placeholder="Check in — Check out"
                    ></input>
                  </DateRangePicker>
                </div>
                <div className="Booking__container">
                  <label htmlFor="guests">Guests</label>
                  <input
                    value={guests}
                    onChange={this.handleOnChange}
                    type="number"
                    className="form-control"
                    id="guests"
                    aria-describedby="guests"
                    placeholder="0"
                    min="1"
                    max="100"
                  />
                </div>
              </form>
              <br />
              <button
                className="Booking__button"
                disabled={!checkIn || !checkOut || !guests}
                onClick={this.confirmReservation}
              >
                Check availability
              </button>
              <p className="info">
                Enter dates and number of guests to see the total trip price.
                Tourism taxes may be added.
              </p>
            </>
          ) : (
            <>
              <BookingPrice
                house={house}
                booking={this.state.selectedBooking}
                onClick={this.handleSelected}
              />
            </>
          )}
        </div>
        {selected && (
          <BookingModal
            open={this.state.modal.open}
            closeModal={this.cancelReservation}
            booking={this.state.selectedBooking}
            confirmModal={this.handleReservation}
            error={this.state.message}
            house={house}
            disabled={!paymentToken}
            acceptPayment={() => (
              <Payment setPaymentToken={this.setPaymentToken} />
            )}
          />
        )}
      </>
    );
    return (
      <div className="Booking">
        <div>{isAuthenticated === true ? auth : guest}</div>
      </div>
    );
  }
}
Booking.propTypes = {
  createBooking: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createBooking })(withRouter(Booking));
