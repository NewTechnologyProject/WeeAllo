export const isAuthenticated = (userExitedid) => {
    return {
        type: "AUTHENTICATE_SIGNAL",
        userExitedid: userExitedid,
    };
};

export const userlogout = () => {
    return {
        type: "LOGOUT_SIGNAL",
    };
};