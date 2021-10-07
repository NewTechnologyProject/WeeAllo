import {
    SET_USER_TYPING,
    CREATE_NEW_MESSAGE,
  } from '../constants/internal-action-types.const'
  
  import {
    USER_TYPING,
  
    NEW_MESSAGE,
  
    NEW_USER_NAME,
    REMOVE_LAST_MESSAGE,
    FADE_LAST_MESSAGE,
  } from '../constants/socket-server-action-types.const'
  
  import socket from '../socket'
  
  const REMOVE_LAST_MESSAGE_COMMAND = '/oops'
  const SET_USER_NAME_COMMAND = '/nick '
  const NEW_THINKING_MESSAGE_COMMAND = '/think '
  const NEW_HIGHLIGHTED_MESSAGE_COMMAND = '/highlight '
  const FADE_LAST_MESSAGE_COMMAND = '/fadelast'
  const COUNTDOWN_MESSAGE_COMMAND = /^\/countdown\s\d+\s(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)$/
  
  /**
   *  Socket Middleware
   */
  export default store => next => action => {
    if (action.type === CREATE_NEW_MESSAGE) {
      if (action.payload.text === REMOVE_LAST_MESSAGE_COMMAND) {
        socket.send(JSON.stringify({
          type: REMOVE_LAST_MESSAGE,
          payload: {
            userId: action.payload.userId,
          },
        }))
  
      } else if (action.payload.text === FADE_LAST_MESSAGE_COMMAND) {
        socket.send(JSON.stringify({
          type: FADE_LAST_MESSAGE,
          payload: {
            userId: action.payload.userId,
          },
        }))
  
      } else if (action.payload.text.startsWith(SET_USER_NAME_COMMAND)) {
        socket.send(JSON.stringify({
          type: NEW_USER_NAME,
          payload: {
            userId: action.payload.userId,
            userName: action.payload.text.substr(SET_USER_NAME_COMMAND.length),
          },
        }))
  
      } else if (action.payload.text.startsWith(NEW_THINKING_MESSAGE_COMMAND)) {
        socket.send(JSON.stringify({
          type: NEW_MESSAGE,
          payload: {
            text: action.payload.text.substr(NEW_THINKING_MESSAGE_COMMAND.length),
            type: 'thinking',
            time: action.payload.time,
            userId: action.payload.userId,
          },
        }))
  
      } else if (action.payload.text.startsWith(NEW_HIGHLIGHTED_MESSAGE_COMMAND)) {
        socket.send(JSON.stringify({
          type: NEW_MESSAGE,
          payload: {
            text: action.payload.text.substr(NEW_HIGHLIGHTED_MESSAGE_COMMAND.length),
            type: 'highlighted',
            time: action.payload.time,
            userId: action.payload.userId,
          },
        }))
  
      } else if (COUNTDOWN_MESSAGE_COMMAND.test(action.payload.text)) {
        const partials = action.payload.text.split(' ')
  
        socket.send(JSON.stringify({
          type: NEW_MESSAGE,
          payload: {
            text: partials[2],
            count: Number(partials[1]),
            type: 'countdown',
            time: action.payload.time,
            userId: action.payload.userId,
          },
        }))
  
      } else {
        socket.send(JSON.stringify({
          type: NEW_MESSAGE,
          payload: {
            text: action.payload.text,
            type: 'normal',
            time: action.payload.time,
            userId: action.payload.userId,
          },
        }))
      }
    }
  
    if (action.type === SET_USER_TYPING) {
      socket.send(JSON.stringify({
        type: USER_TYPING,
        payload: {
          userId: action.payload.userId,
          typing: action.payload.typing,
        },
      }))
    }
  
    return next(action)
  }
  