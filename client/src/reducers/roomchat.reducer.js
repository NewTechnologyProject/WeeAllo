import {
  INITIALIZE_APP,
  UPDATE_MESSAGES_LIST,
} from "../constants/internal-action-types.const";

const initialState = {
  listMessages: [],
  listMembers: [],
};

export const roomChatReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get list messages
    case "LIST MESSAGES": {
      return {
        ...state,
        listMessages: [...action.payload],
      };
    }

    case INITIALIZE_APP:
    case UPDATE_MESSAGES_LIST:
      return { ...action.payload.messages };
    default:
      return state;
  }
};
