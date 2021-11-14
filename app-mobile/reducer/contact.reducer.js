import { ACTION_TYPES } from "../action/contact.action";

const initialState = {
  listcontact: [],
  listSend: [],
  listReceive: [],
  listSearchContact: [],
  detailContact: null,
  addContact: null,
  userQR: null,
  jsonString: null,
  listSearchMobile: []
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_CONTACT:
      return {
        ...state,
        listcontact: [...action.payload],
      };
    case ACTION_TYPES.FETCH_ALL_SEND_CONTACT:
      return {
        ...state,
        listSend: [...action.payload],
      };
    case ACTION_TYPES.FETCH_ALL_RECEIVE_CONTACT:
      return {
        ...state,
        listReceive: [...action.payload],
      };
    case ACTION_TYPES.SEARCH_CONTACT:
      return {
        ...state,
        listSearchContact: [...action.payload],
      };
    case ACTION_TYPES.DETAIL_CONTACT:
      return {
        ...state,
        detailContact: action.payload,
      };
    case ACTION_TYPES.FIND_USER_BY_PHONE:
      return {
        ...state,
        detailContact: action.payload,
      };
    case ACTION_TYPES.DELETE_ALL_CONTACT:
      return {
        ...state,
        listcontact: [...action.payload],
      };
    case ACTION_TYPES.DELETE_SEND_CONTACT:
      return {
        ...state,
        listSend: [...action.payload],
      };
    case ACTION_TYPES.DELETE_RECEIVE_CONTACT:
      return {
        ...state,
        listReceive: [...action.payload],
      };
    case ACTION_TYPES.ACCEPT_CONTACT:
      return {
        ...state,
        listReceive: [...action.payload],
      };
    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        addContact: action.payload,
      };
    case ACTION_TYPES.FIND_USER_BY_ID:
      return {
        ...state,
        userQR: action.payload,
      };
    case ACTION_TYPES.COUNT_FRIEND:
      return {
        ...state,
        countFriend: action.payload,
      };
    case ACTION_TYPES.GET_JSON_STRING:
      return {
        ...state,
        listDeviceContact: action.payload,
      };
    case ACTION_TYPES.SEARCH_CONTACT_MOBILE:
      return {
        ...state,
        listSearchMobile: [...action.payload],
      };
    default:
      return state;
  }
};
