import AsyncStorage from '@react-native-async-storage/async-storage'
import * as action from '../action/user.action'
const SET_USER_AUTHENTICATE = "user_authenticated";

if (AsyncStorage.getItem(SET_USER_AUTHENTICATE) === null) {
    AsyncStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
}
const userAuth = AsyncStorage.getItem(SET_USER_AUTHENTICATE);
const initialState = {
    isAuthenticated: null,
    userAuth: userAuth,
};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHENTICATE_SIGNAL": {
            if (AsyncStorage.getItem(SET_USER_AUTHENTICATE) === "undefined") {
                AsyncStorage.setItem(
                    SET_USER_AUTHENTICATE,
                    JSON.stringify(action.userExitedid)
                );
                return {
                    ...state,
                    userAuth: action.userExitedid,
                };
            }
            if (AsyncStorage.getItem(SET_USER_AUTHENTICATE) !== action.userExitedid) {
                AsyncStorage.setItem(
                    SET_USER_AUTHENTICATE,
                    JSON.stringify(action.userExitedid)
                );
                return {
                    ...state,
                    userAuth: action.userExitedid,
                };
            }
        }
        case "LOGOUT_SIGNAL": {
            AsyncStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
            return {
                ...state,
                userAuth: "undefined",
            };
        }
        default:
            return state;
    }
};
