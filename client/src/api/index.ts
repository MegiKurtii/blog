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

export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const fetchPosts = (page: number) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery: { search?: string; tags?: string; name?: string; description?: string }) =>
    API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}&name=${searchQuery.name || 'none'}&description=${searchQuery.description || 'none'}`);

export const createPost = (newPost: object) => API.post('/posts', newPost);
export const updatePost = (id: string, updatedPost: object) => API.patch(`/users/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const updateUser = (id: string, updatedUser: object) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id: string) => API.delete(`/users/${id}`);


export const signIn = (formData: { email: string, password: string }) => API.post('/users/signin', formData);
export const signUp = (formData: object) => API.post('/users/signup', formData);
export const comment = (value: any, id: string) => API.post(`/posts/${id}/commentPost`, { value });