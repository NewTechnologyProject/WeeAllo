import { UPDATE_MESSAGES_LIST } from '../constants/internal-action-types.const'

export default ({ messages }) => ({
  type: UPDATE_MESSAGES_LIST,
  payload: {
    messages,
  },
})
