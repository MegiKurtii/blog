import axios from 'axios';
import { Dispatch } from 'redux';
import * as api from '../api';

// Action creators
export const getPosts = () => async (dispatch:Dispatch) => {
  

    try {
        const { data } = await api.fetchPosts(); 
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPosts = (post: object) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePosts = (id: any,post: any) => async (dispatch: Dispatch) => {
    

    try {
        const { data } = await api.updatePost(id,post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const deletePosts = (id: any) => async (dispatch: Dispatch) => {


    try {
         await api.deletePost(id);
        dispatch({ type: 'DELETE',payload:id});
    } catch (error) {
        console.log(error);
    }
};