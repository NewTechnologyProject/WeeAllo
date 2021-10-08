import { SET_USER_TYPING, CREATE_NEW_MESSAGE } from '../constants/internal-action-types.const'

import { getActiveUser } from '../selectors/active-user.selectors'

import { emojizz } from '../helpers/emoji.helpers'

/**
 *  Message Enricher Middleware
 */
export default store => next => action => {
  if (action.type === CREATE_NEW_MESSAGE) {
    const activeUser = getActiveUser(store.getState())

    return next({
      ...action,
      payload: {
        ...action.payload,
        text: emojizz(action.payload.text),
        userId: activeUser.id,
        time: new Date().toISOString(),
      },
    })
  }

  if (action.type === SET_USER_TYPING) {
    const activeUser = getActiveUser(store.getState())

    return next({
      ...action,
      payload: {
        ...action.payload,
        userId: activeUser.id,
      },
    })
  }

  return next(action)
}
