import apiService from "../services/api.service";

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

//Get list members with userAdd
export const fetchAllMembersWithUserAdd = (roomId) => (dispatch) => {
  apiService
    .roomchat()
    .listMembersWithUserAdd(roomId)
    .then((response) => {
      dispatch({
        type: "LIST MEMBERS WITH USER ADD",
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Add new group chat
export const addNewGroupChat = (newGroupChat) => {
  return apiService.roomchat().newGroupChat(newGroupChat);
};

//Upload image to aws s3
export const uploadAvatar = (formData) => {
  return apiService.upload().image(formData);
};

//Delete group chat
export const deleteRoomChat = (roomId) => {
  return apiService.roomchat().deleteRoom(roomId);
};

//Get list members
export const fetchAllMembersToGetName = (roomId) => {
  return apiService.roomchat().listMembers(roomId);
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
