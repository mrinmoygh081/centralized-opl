let initialState = {
  loggedInUser: null,
  loginToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedInUser: action.payload,
        loginToken: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
