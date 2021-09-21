import apiService from "../services/api.service"

export const isAuthenticated = (userExitedid) => {
    return {
        type: 'AUTHENTICATE_SIGNAL',
        userExitedid: userExitedid,
    }
}
export const userlogout = () => {
    return {
        type: 'LOGOUT_SIGNAL',
    }
}

export const ACTION_TYPES = {
    LOGIN: 'LOGIN',
    FETCH_ALL: 'FETCH_ALL',
}
export const login = (phone, pass) => dispatch => {
    apiService.user().login(phone, pass)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: response.data
            })
        })
        .catch(
            err => console.log(err)
        )
}
export const fetchAll = () => dispatch => {
    apiService.user().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
