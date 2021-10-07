/**
 *  Users List Selector
 */
 export const getUsersList = state => (
    Object.keys(state.users).map(key => state.users[key])
  )
  