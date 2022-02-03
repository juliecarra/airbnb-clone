import { combineReducers } from "redux";

import { auth } from "./auth";
import { houses, house } from "./houses";
import { bookings } from "./bookings";

export default combineReducers({
  auth,
  houses,
  house,
  bookings,
});
