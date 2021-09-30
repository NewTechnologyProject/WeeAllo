import apiService from "../services/api.service";

export const fetchAllMessages = (roomId) => (dispatch) => {
  apiService
    .roomchat()
    .listMessages(roomId)
    .then((response) => {
      dispatch({
        type: "LIST MESSAGES",
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};
