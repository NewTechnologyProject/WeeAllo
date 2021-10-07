import { types } from "react-alert";
import apiService from "../services/api.service";
//import * as types from "./ActionType"

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

let nextMessageId = 0;
const nextUserId = 0;

export const addMessage = (message, author) => ({
  type: "ADD_MESSAGE",
  id: nextMessageId++,
  message,
  author
})

export const addUser = name => ({
  type: "ADD_USER",
  id: nextUserId,
  name
})

export const messageReceived = (message, author) => ({
  type: "MESSAGE_RECEIVED",
  id: nextMessageId++,
  message,
  author
})

export const populateUsersList = users => ({
  type:"USERS_LIST",
  users
})