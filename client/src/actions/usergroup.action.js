import apiService from "../services/api.service";

export const addUserGroup = (userGroup) => {
  return apiService.usergroup().addUserGroup(userGroup);
};
