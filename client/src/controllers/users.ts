import { Dispatch } from 'redux';
import * as api from '../api';
import {  DELETE_USER, UPDATE_USER } from '../constants/actionTypes';

export const updateUser = (id: string, user: object) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: UPDATE_USER, data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE_USER });
    } catch (error) {
        console.log(error);
    }
};
