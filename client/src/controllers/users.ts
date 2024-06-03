import { Dispatch } from 'redux';
import * as api from '../api';
import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const updateProfile = () => async (dispatch: Dispatch) => {

    try {
      
    } catch (error) {
        console.log(error);
    }
};

export const deleteProfile = (searchQuery: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    } catch (error) {
        console.log(error);
    }
};
