import apiService from "../services/api-service";

export const isAuthenticated = (userExitedid) => {
  return {
    type: "AUTHENTICATE_SIGNAL",
    userExitedid: userExitedid,
  };
};

export const userlogout = () => {
  return {
    type: "LOGOUT_SIGNAL",
  };
};

// Get all rooms
export const fetchAllRoom = (userId) => (dispatch) => {
  apiService
    .user()
    .listRoom(userId)
    .then((response) => {
      dispatch({
        type: "LIST ROOMS",
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
