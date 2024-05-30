import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    const profileString = localStorage.getItem('profile');

    if (profileString) {
        const profile = JSON.parse(profileString);
        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const fetchPostBySearch = (searchQuery: any) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost: object) => API.post('/posts', newPost);
export const updatePost = (id: string, updatedPost: object) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.patch(`/posts/${id}`);

export const signIn = (formData: object) =>  API.post('/users/signin',formData);
export const signUp = (formData: object) => API.post('/users/signup', formData);
