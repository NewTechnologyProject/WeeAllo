import apiService from "../services/api.service"

export const ACTION_TYPES = {
    FETCH_ALL: 'FETCH_ALL',
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
