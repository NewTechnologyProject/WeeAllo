const initialState = {
  listMessages: [],
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
    default:
      return state;
  }
};
