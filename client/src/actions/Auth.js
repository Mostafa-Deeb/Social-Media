import Auth from "../components/Auth";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("signin");
    console.log(data);
    dispatch({ type: Auth, data });
    navigate("/");
  } catch (error) {
    console.log("err");
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  console.log("up");
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: Auth, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
