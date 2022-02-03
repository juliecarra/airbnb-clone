import React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

export function BookingCard(props) {
  const { booking } = props;

  return (
    <div className="col-md-4">
      <div className="c text-center">
        <div className="c-header">
          {booking.house ? booking.house.houseType : "Deleted house"}
        </div>
        <div className="c-block">
          {booking.house && (
            <div>
              <h4 className="c-title">
                {" "}
                {booking.house.title} - {booking.house.town}
              </h4>
              <p
                style={{ color: "#222", marginLeft: "0px" }}
                className="c-text booking-desc"
              >
                {booking.house.description}
              </p>
            </div>
          )}

          <p
            style={{ color: "#222", fontWeight: "600", marginLeft: "0px" }}
            className="c-text booking-days"
          >
            {moment(booking.startAt).format("MM/DD/YYYY")} -{" "}
            {moment(booking.endAt).format("MM/DD/YYYY")} | {booking.days} days
          </p>
          <p className="c-text booking-price">
            <span
              style={{
                color: "#222",
                fontWeight: "600",
                fontSize: "22px",
                marginLeft: "0px",
              }}
            >
              Price:{" "}
            </span>{" "}
            <span
              style={{
                color: "#222",
                fontWeight: "600",
                fontSize: "22px",
                marginLeft: "0px",
              }}
              className="booking-price-value"
            >
              {booking.totalPrice}€
            </span>
          </p>
          {booking.house && (
            <Link
              className="btn btn-booking"
              to={`/houses/${booking.house._id}`}
            >
              See house
            </Link>
          )}
        </div>
        <br />
        <div className="c-footer text-muted">
          Created {moment(booking.createdAt).format("MM/DD/YYYY")}
        </div>
      </div>
    </div>
  );
}

export function PaymentCard({ booking, payment, paymentBtns }) {
  return (
    <div className="col-md-4">
      <div className="c text-center">
        <div className="c-header">
          Booking made by: {payment.fromUser.firstName}
        </div>
        <div className="c-block">
          <p
            style={{ color: "#222", marginLeft: "0px" }}
            className="c-text booking-price"
          >
            <span
              style={{
                color: "#222",
                fontWeight: "600",
                fontSize: "22px",
                marginLeft: "0px",
              }}
            >
              Price:{" "}
            </span>{" "}
            <span
              style={{
                color: "#222",
                fontWeight: "600",
                fontSize: "22px",
                marginLeft: "0px",
              }}
              className="booking-price-value"
            >
              {payment.amount / 100}€
            </span>
          </p>
          <p
            style={{ color: "#222", marginLeft: "0px" }}
            className="c-text payment-status"
          >
            Status: {payment.status}
          </p>
        </div>
        <div className="c-footer text-muted">
          {payment.status === "pending" && paymentBtns && paymentBtns(payment)}
        </div>
      </div>
    </div>
  );
}
