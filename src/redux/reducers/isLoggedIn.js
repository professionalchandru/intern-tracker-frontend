let defaultState = {
    userId: 0,
    email: "",
    token: "",
    userType: "",
    isLoggedIn: false,
};
const isLoggedInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userType: action.payload.userType,
                userId: action.payload.id,
                email: action.payload.email,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                ...state,
                userType: action.payload.userType,
                userId: action.payload.id,
                email: action.payload.email,
                isLoggedIn: false,
                token: action.payload.token,
            };
        default:
            return state;
    }
};

export default isLoggedInReducer;
