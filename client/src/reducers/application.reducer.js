import { INITIALIZE_APP } from '../constants/internal-action-types.const'

/**
 *  Application Initial State
 */
const initialState = {
  ready: false,
}

/**
 *  Application Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return { ...state, ready: true }

    default:
      return state
  }
}
