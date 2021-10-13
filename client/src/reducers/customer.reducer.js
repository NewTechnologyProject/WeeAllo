import { ACTION_TYPES } from "../actions/customer.action";

const SET_USER_AUTHENTICATE = "user_authenticated";

if (localStorage.getItem(SET_USER_AUTHENTICATE) === null) {
  localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
}
//localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);

const initialState = {
  isAuthenticated: null,
  userAuth: userAuth,
  list: [],
  listRooms: [],
  listFriends: [],
  register: null,
  updateUser: null,
  // login: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    case ACTION_TYPES.LOGIN: {
      return {
        ...state,
        login: action.payload,
      };
    }
    case ACTION_TYPES.REGISTER: {
      return {
        ...state,
        register: action.payload,
      };
    }
    case ACTION_TYPES.UPDATEBYIDUSER: {
      return {
        ...state,
        updateUser: action.payload,
      };
    }
    case ACTION_TYPES.FINDUSERBYID: {
      return {
        ...state,
        userById: action.payload,
      };
    }
    case ACTION_TYPES.FINDUSERBYPHONE: {
      return {
        ...state,
        userByPhone: action.payload,
      };
    }
    case "AUTHENTICATE_SIGNAL": {
      if (localStorage.getItem(SET_USER_AUTHENTICATE) === "undefined") {
        localStorage.setItem(
          SET_USER_AUTHENTICATE,
          JSON.stringify(action.userExitedid)
        );
        return {
          ...state,
          userAuth: action.userExitedid,
        };
      }
      if (localStorage.getItem(SET_USER_AUTHENTICATE) !== action.userExitedid) {
        localStorage.setItem(
          SET_USER_AUTHENTICATE,
          JSON.stringify(action.userExitedid)
        );
        return {
          ...state,
          userAuth: action.userExitedid,
        };
      }
    }
    case "LOGOUT_SIGNAL": {
      localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
      return {
        ...state,
        userAuth: "undefined",
      };
    }

    //Get list rooms
    case "LIST ROOMS": {
      return {
        ...state,
        listRooms: [...action.payload],
      };
    }

    //Get list friends
    case "LIST FRIENDS": {
      return {
        ...state,
        listFriends: [...action.payload],
      };
    }

    default:
      return state;
  }
};
