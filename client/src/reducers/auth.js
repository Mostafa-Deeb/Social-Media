import Auth from "../components/Auth";

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case Auth:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};
