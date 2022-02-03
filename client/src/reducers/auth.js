import { SET_CURRENT_USER } from "../actions/types";

import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
