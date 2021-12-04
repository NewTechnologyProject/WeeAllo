const initialState = {
  listMessages: [],
  listMembers: [],
  listMembersWithUserAdd: [],
  moveToActiveRoom: null,
  activeRoom: null,
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

    // Get list members
    case "LIST MEMBERS": {
      return {
        ...state,
        listMembers: [...action.payload],
      };
    }

    // Get list members with user add
    case "LIST MEMBERS WITH USER ADD": {
      return {
        ...state,
        listMembersWithUserAdd: [...action.payload],
      };
    }

    //Move to active room
    case "MOVE TO ACTIVE ROOM": {
      return {
        ...state,
        moveToActiveRoom: { ...action.payload },
      };
    }

    //Set active room
    case "SET ACTIVE ROOM": {
      return {
        ...state,
        activeRoom: { ...action.payload },
      };
    }

    //   case INITIALIZE_APP:
    //   case UPDATE_MESSAGES_LIST:
    //     return { ...action.payload.messages };
    default:
      return state;
  }
};
