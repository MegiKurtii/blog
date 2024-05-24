import axios from 'axios';
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: object) => axios.post(url, newPost);
export const updatePost = (id: string, updatePost: object) => axios.patch(`${url}/${id}`, updatePost);

