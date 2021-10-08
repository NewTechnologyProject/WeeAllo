import { INITIALIZE_APP, UPDATE_USERS_LIST } from '../constants/internal-action-types.const'

/**
 *  Users Initial State
 */
const initialState = {}

/**
 *  Users Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
    case UPDATE_USERS_LIST:
      return { ...action.payload.users }

    default:
      return state
  }
}
