export const loginFun = (loginUserData) => {
  return {
    type: "LOGIN",
    payload: loginUserData,
  };
};

export const logoutFun = () => {
  return {
    type: "LOGOUT",
  };
};
