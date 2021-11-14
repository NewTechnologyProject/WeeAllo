import apiService from "../services/api.service";

export const ACTION_TYPES = {
  COUNT_GROUP: "COUNT_GROUP",
};

export const addUserGroup = (userGroup) => {
  return apiService.usergroup().addUserGroup(userGroup);
};

export const deleteUserGroup = (roomId, userId) => {
  return apiService.usergroup().deleteUserGroup(roomId, userId);
};
