import apiService from "../services/api.service";

export const ACTION_TYPES = {
  ADDMESSAGE : "ADDMESSAGE",
};

export const addMessage = (message) => (dispatch) => {
  apiService
    .message()
    .addMessage(message)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.ADDMESSAGE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};