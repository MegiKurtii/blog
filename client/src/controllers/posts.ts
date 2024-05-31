
import { Dispatch } from 'redux';
import * as api from '../api';
import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING} from '../constants/actionTypes';

export const getPosts = () => async (dispatch:Dispatch) => {
  
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
        console.log(data);
    } catch (error) {
        console.log(error);
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

export const createPosts = (post: object) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePosts = (id: any,post: any) => async (dispatch: Dispatch) => {
    

    try {
        const { data } = await api.updatePost(id,post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const deletePosts = (id: any) => async (dispatch: Dispatch) => {


    try {
         await api.deletePost(id);
        dispatch({ type: DELETE,payload:id});
    } catch (error) {
        console.log(error);
    }
};