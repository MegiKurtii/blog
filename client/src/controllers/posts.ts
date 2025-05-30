
import { Dispatch } from 'redux';
import * as api from '../api';
import { fetchPosts } from '../api';
import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, START_LOADING, FETCH_POST, END_LOADING,COMMENT,LIKE } from '../constants/actionTypes';

export const getPost = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, totalPages } } = await fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, totalPages } });
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        dispatch({ type: END_LOADING });
    }
};

export const getPostBySearch = (searchQuery: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export const createPosts = (post: object, navigate: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
        navigate(`/posts/${data._id}`); 
    } catch (error) {
        console.error("Failed to create post", error);
    }
};

export const updatePosts = (id: any, post: any) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error("Failed to update post", error);
    }
};
export const deletePosts = (id: any) => async (dispatch: Dispatch) => {


    try {
         await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value:any, id:string) => async (dispatch:Dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};


