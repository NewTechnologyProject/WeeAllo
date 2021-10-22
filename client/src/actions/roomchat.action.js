import apiService from "../services/api.service";
// import { types } from "react-alert";
//import * as types from "./ActionType"

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

//Add new group chat
export const addNewGroupChat = (newGroupChat) => {
  return apiService.roomchat().newGroupChat(newGroupChat);
};

//Get list members
export const fetchAllMembers = (roomId) => {
  return apiService.roomchat().listMembers(roomId);
};

//Upload image to aws s3
export const uploadAvatar = (formData) => {
  return apiService.upload().image(formData);
};

//Delete group chat
export const deleteRoomChat = (roomId) => {
  return apiService.roomchat().deleteRoom(roomId);
};

//Update creator
export const updateCreator = (roomId, creator) => {
  apiService
    .roomchat()
    .updateCreator(roomId, creator)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
};

let nextMessageId = 0;
const nextUserId = 0;

export const addMessage = (message, author) => ({
  type: "ADD_MESSAGE",
  id: nextMessageId++,
  message,
  author,
});

export const addUser = (name) => ({
  type: "ADD_USER",
  id: nextUserId,
  name,
});

export const messageReceived = (message, author) => ({
  type: "MESSAGE_RECEIVED",
  id: nextMessageId++,
  message,
  author,
});

export const populateUsersList = (users) => ({
  type: "USERS_LIST",
  users,
});
