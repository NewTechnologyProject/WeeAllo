/**
 *  Messages List Selector
 */
 export const getMessagesList = state => (
    Object.keys(state.messages).map(key => state.messages[key])
  )
  