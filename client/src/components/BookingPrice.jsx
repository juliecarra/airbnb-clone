import React from "react";

const BookingPrice = ({ house, booking, onClick }) => {
  const { price } = house;
  const { days, totalPrice, guests, checkIn, checkOut } = booking;
  return (
    <>
      <h2 className="Booking__title">€{price} / night</h2>
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
      <form className="Booking__form" style={{ width: "100%" }}>
        <div className="Booking__container">
          <label htmlFor="dates">Dates</label>
          <input placeholder={`${checkIn} - ${checkOut}`} />
        </div>
        <div className="Booking__container">
          <label htmlFor="guests">Guests</label>
          <input placeholder={guests} />
        </div>
      </form>
      <br />
      <button className="Booking__button" onClick={onClick}>
        Reserve
      </button>
      <div className="Booking__infos">
        <p>You won't be charged yet </p>
        <p>Total trip price includes VAT and all applicable fees</p>
      </div>
      <div
        className="Booking__total"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: "rgb(34, 34, 34)",
        }}
      >
        <p
          style={{
            textDecoration: "underline",
          }}
        >
          €{price} x {days} {days !== 1 ? "nights" : "night"}
        </p>
        <p>€{totalPrice}</p>
      </div>

      <br />

      <div
        className="Booking__total"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: "1px solid rgb(221, 221, 221)",
        }}
      >
        <h3>Total</h3>
        <p style={{ fontWeight: "bold" }}>€{totalPrice}</p>
      </div>
    </>
  );
};

export default BookingPrice;
