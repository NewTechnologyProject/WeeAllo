import { INITIALIZE_APP } from '../constants/internal-action-types.const'

/**
 *  Active User Initial State
 */
const initialState = {}

/**
 *  Active User Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return { ...state, ...action.payload.activeUser }

    default:
      return state
  }
}
