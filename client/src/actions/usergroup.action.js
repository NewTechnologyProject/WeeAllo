import apiService from "../services/api.service";

export const addUserGroup = (userGroup) => {
  return apiService.usergroup().addUserGroup(userGroup);
};

export const deleteUserGroup = (roomId, userId) => {
  return apiService.usergroup().deleteUserGroup(roomId, userId);
};
