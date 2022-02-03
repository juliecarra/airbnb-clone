import {
  FETCH_HOUSES_INIT,
  FETCH_HOUSES,
  FETCH_HOUSE_BY_ID,
  DELETE_HOUSE,
} from "../actions/types";

const initialState = {
  houses: [],
  house: [],
};

export const houses = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOUSES_INIT:
      return { ...state };
    case FETCH_HOUSES:
      // debugger;
      return { ...state, houses: action.payload };
    case DELETE_HOUSE:
      return {
        ...state,
        houses: state.houses.filter((house) => house._id !== action.payload),
      };
    default:
      return state;
  }
};

export const house = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOUSE_BY_ID:
      return { ...state, house: action.payload };
    default:
      return state;
  }
};
