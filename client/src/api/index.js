import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const data = JSON.parse(localStorage.getItem("profile"));
    req.headers.Authorization = `Bearer ${data.token}`;
  }
  return req;
});
export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.serach || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const commentPost = (comment, id) =>
  API.post(`/posts/${id}/comment`, comment);
