import { ACTION_TYPES } from "../actions/contact.action";

const initialState = {
  message: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDMESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
