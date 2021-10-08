import { SET_USER_TYPING } from '../constants/internal-action-types.const'

export default ({ typing }) => ({
  type: SET_USER_TYPING,
  payload: {
    typing,
  },
})
