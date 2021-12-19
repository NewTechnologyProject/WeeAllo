import apiService from "../services/api.service";

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

export const ACTION_TYPES = {
  LOGIN: "LOGIN",
  FINDUSERBYID: "FINDUSERBYID",
  UPDATEBYIDUSER: "UPDATEBYIDUSER",
  REGISTER: "REGISTER",
  FORGOTPASS: "FORGOTPASS",
};
export const login = (phone, pass) => (dispatch) => {
  apiService
    .user()
    .login(phone, pass)
    .then((response) => {
      dispatch({
        type: "LOGIN",

        type: ACTION_TYPES.LOGIN,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

// Get all rooms
export const fetchAllRoom = (userId) => (dispatch) => {
  apiService
    .user()
    .listRoom(userId)
    .then((response) => {
      let data = response.data;

      if (data.length >= 2) {
        data = data.sort((a, b) => b.id - a.id);
      }

      dispatch({
        type: "LIST ROOMS",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get all friends
export const fetchAllFriend = (userId) => (dispatch) => {
  apiService
    .user()
    .listFriend(userId)
    .then((response) => {
      dispatch({
        type: "LIST FRIENDS",
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//find user by id
export const findByIdUser = (id) => (dispatch) => {
  apiService
    .user()
    .findByIdUser(id)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FINDUSERBYID,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

//update user by id
export const updateUserById = (userChat, id) => (dispatch) => {
  apiService
    .user()
    .updateByIdUser(userChat, id)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATEBYIDUSER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};
export const register = (userChat) => (dispatch) => {
  apiService
    .user()
    .addUser(userChat)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.REGISTER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};
export const forgotpass = (phone, newpass) => (dispatch) => {
  apiService
    .user()
    .forgotpass(phone, newpass)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FORGOTPASS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};
