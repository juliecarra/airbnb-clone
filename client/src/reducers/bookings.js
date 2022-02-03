import { FETCH_BOOKINGS_INIT, FETCH_BOOKINGS } from "../actions/types";

const initialBookingsState = {
  bookings: [],
  isFetching: false,
};

export const bookings = (state = initialBookingsState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_INIT:
      return { ...state, isFetching: true };
    case FETCH_BOOKINGS:
      return { ...state, bookings: action.payload, isFetching: false };
    default:
      return state;
  }
};
