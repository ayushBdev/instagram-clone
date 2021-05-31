import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000/"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const getUsers = () => API.get("/auth")
export const getUserById = (id) => API.get(`/auth/${id}`);
export const postFollowing = (id,val) => API.patch(`/auth/update/${id}`, val);

export const fetchPosts = () => API.get("/posts");
export const getPostsById = (id) => API.get(`/posts/post/${id}`);
export const createNewPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id, val) => API.patch(`/posts/like/${id}`, val);
export const addComment = (id, val) => API.patch(`/posts/comment/${id}`, val);

export default API;