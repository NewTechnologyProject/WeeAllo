import apiService from "../services/api.service"

export const ACTION_TYPES = {
    FETCH_ALL_CONTACT: 'FETCH_ALL_CONTACT',
    FETCH_ALL_SEND_CONTACT: 'FETCH_ALL_SEND_CONTACT',
    FETCH_ALL_RECEIVE_CONTACT: 'FETCH_ALL_RECEIVE_CONTACT',
    SEARCH_CONTACT: 'SEARCH_CONTACT',
    DETAIL_CONTACT: 'DETAIL_CONTACT',
    DELETE_ALL_CONTACT: 'DELETE_ALL_CONTACT',
    DELETE_SEND_CONTACT: 'DELETE_SEND_CONTACT',
    DELETE_RECEIVE_CONTACT: 'DELETE_RECEIVE_CONTACT',
    ACCEPT_CONTACT: 'ACCEPT_CONTACT',
    ADD_CONTACT: 'ADD_CONTACT',
    FIND_USER_BY_ID: 'FIND_USER_BY_ID',
    FIND_USER_BY_PHONE: 'FIND_USER_BY_PHONE'
}

export const fetchAllContact = (id) => dispatch => {
    apiService.contact().getAllContact(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchSendContact = (id) => dispatch => {
    apiService.contact().getSendContact(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_SEND_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchReceiveContact = (id) => dispatch => {
    apiService.contact().getReceiveContact(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_RECEIVE_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const searchContact = (phone) => dispatch => {
    apiService.contact().searchContact(phone)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.SEARCH_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const detailContact = (idAuth, idShow) => dispatch => {
    apiService.contact().detailContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DETAIL_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const deleteAllContact = (idAuth, idShow) => dispatch => {
    apiService.contact().deleteContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_ALL_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const deleteSendContact = (idAuth, idShow) => dispatch => {
    apiService.contact().deleteSendContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_SEND_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const deleteReceiveContact = (idAuth, idShow) => dispatch => {
    apiService.contact().deleteReceiveContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_RECEIVE_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const acceptContact = (idAuth, idShow) => dispatch => {
    apiService.contact().acceptContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.ACCEPT_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const addContact = (idAuth, idShow) => dispatch => {
    apiService.contact().addContact(idAuth, idShow)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.ADD_CONTACT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const findUserById = (id) => dispatch => {
    apiService.user().findByIdUser(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FIND_USER_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const findUserByPhone = (phone, id) => dispatch => {
    apiService.contact().searchbyphone(phone, id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FIND_USER_BY_PHONE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
