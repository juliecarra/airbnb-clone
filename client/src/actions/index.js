import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthorizationToken from "../utils/setAuthorizationToken";
import {
  SET_CURRENT_USER,
  FETCH_HOUSES_INIT,
  FETCH_HOUSES,
  FETCH_HOUSE_BY_ID,
  DELETE_HOUSE,
  FETCH_BOOKINGS_INIT,
  FETCH_BOOKINGS,
} from "./types";

export const setCurrentUser = (token) => {
  return {
    type: SET_CURRENT_USER,
    payload: token,
  };
};

export const withEmail = (userData, history) => async (dispatch) => {
  try {
    await axios.post("/api/auth/withEmail", userData);
    history.push("/");
  } catch (error) {
    throw error.response.data.message;
  }
};

export const withPhoneNumber = (userData, history) => async (dispatch) => {
  try {
    await axios.post("/api/auth/withPhoneNumber", userData);

    history.push("/");
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = (userData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", userData);

    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);

    dispatch(setCurrentUser(jwtDecode(token)));

    history.push("/");
  } catch (error) {
    throw error.response.data.message;
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post("/api/auth/logout");
    localStorage.removeItem("jwtToken");
    dispatch(setCurrentUser({}));
    history.push("/");
  } catch (error) {
    throw error.response.data.message;
  }
};

// houses
export const fetchHouses = (town) => async (dispatch) => {
  try {
    const url = town ? `/api/houses?town=${town}` : "/api/houses";

    dispatch({ type: FETCH_HOUSES_INIT });

    const res = await axios.get(url);

    dispatch({ type: FETCH_HOUSES, payload: res.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const fetchHouseById = (houseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/houses/${houseId}`);
    dispatch({ type: FETCH_HOUSE_BY_ID, payload: res.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const fetchUserHouses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/houses/manage");
    dispatch({ type: FETCH_HOUSES, payload: res.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const hostHouse = (houseData, history) => async (dispatch) => {
  try {
    await axios.post("/api/houses", houseData);
    history.push("/");
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteHouse = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/houses/${id}`);
    history.push("/");
    dispatch({
      type: DELETE_HOUSE,
      payload: id,
    });
  } catch (error) {
    throw error.response.data.message;
  }
};

//bookings

export const createBooking = (booking, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/bookings", booking);
    history.push("/");
    dispatch({ payload: res.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_INIT });
  try {
    const res = await axios.get("/api/bookings/manage");
    // debugger;
    dispatch({ type: FETCH_BOOKINGS, payload: res.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

// Payments actions
export const getPendingPayments = () => {
  return axios
    .get("/api/payments/pending")
    .then((res) => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const acceptPayment = (payment) => {
  return axios
    .post("/api/payments/confirm", payment)
    .then((res) => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const declinePayment = (payment) => {
  return axios
    .post("/api/payments/decline", payment)
    .then((res) => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
