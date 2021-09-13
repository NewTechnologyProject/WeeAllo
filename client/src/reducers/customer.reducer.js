import { ACTION_TYPES } from "../actions/customer.action"


const initialState = {
    list: [],
}


export const customerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}