import React from "react";
import Modal from "react-responsive-modal";

import EventIcon from "@material-ui/icons/Event";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import "react-responsive-modal/styles.css";

const BookingModal = ({
  house,
  booking,
  open,
  closeModal,
  confirmModal,
  disabled,
  acceptPayment,
  error,
}) => {
  const { houseType, title, town, image } = house;
  const { totalPrice, checkIn, checkOut, guests } = booking;
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        classNames={{ modal: "booking-modal" }}
      >
        <div className="BookingModal__container">
          <div className="BookingModal--left">
            <h4 className="modal-title title">Confirm and pay</h4>

            <p style={{ marginLeft: "0px", color: "#717171" }}>
              Pay with this credit card number: <br /> 4242 4242 4242 4242
            </p>

            {acceptPayment && acceptPayment()}
          </div>
          <br />

          <div className="BookingModal--right">
            <div className="BookingModal__house">
              <h2>
                {title}
                <br />
                <span>
                  Entire {houseType} in {town}
                </span>
              </h2>
              <img src={image} width="100px" alt="" />
            </div>
            <div className="BookingModal__booking">
              <p>
                <EventIcon /> {checkIn} - {checkOut}
              </p>
              <p>
                <PeopleAltIcon /> {guests}
              </p>
            </div>
            <div className="BookingModal__total">
              <h2>Total (EUR)</h2>
              <h2>€{totalPrice}</h2>
            </div>
          </div>
        </div>
        <br />
        <div className="modal-footer">
          <button
            type="button"
            className="BookingModal__btn--confirm"
            onClick={confirmModal}
            disabled={disabled}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="BookingModal__btn--cancel"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingModal;
