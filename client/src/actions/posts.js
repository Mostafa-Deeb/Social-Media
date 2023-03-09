import * as api from "../api";
import {
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  IS_LOADING,
  LIKE,
  UPDATE,
} from "../constants";
export const getPosts = (page) => async (dispatch) => {
  try {
    console.log("get");
    dispatch({ type: IS_LOADING });
    const { data } = await api.getPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    const { data } = await api.createPost(post);
    console.log(data);
    navigate(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch({ type: DELETE, payload: data.id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    console.log(searchQuery);
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("erron i search");
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  console.log("in post");
  try {
    dispatch({ type: IS_LOADING });
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("errorr post");
    console.log(error);
  }
};
export const commentPost = (comment, id) => async (dispatch) => {
  try {
    console.log("actions");
    // dispatch({ type: IS_LOADING });
    const { data } = await api.commentPost(comment, id);
    console.log(data);
    dispatch({ type: COMMENT, payload: data });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("actionserror");
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
