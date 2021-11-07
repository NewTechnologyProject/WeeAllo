import apiService from "../services/api-service";

//Get list messages
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

//Get list messages
export const fetchAllMembers = (roomId) => (dispatch) => {
  apiService
    .roomchat()
    .listMembers(roomId)
    .then((response) => {
      dispatch({
        type: "LIST MEMBERS",
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};
