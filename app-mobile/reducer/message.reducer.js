import { ACTION_TYPES } from "../action/message.action"


const initialState = {
    message: null
}

export const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.ADDMESSAGE:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state
    }
}