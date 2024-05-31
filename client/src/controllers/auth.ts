
import { AUTH} from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData: { email: string, password: string }, navigate: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log('Error during sign in:', error);
    }
};

export const signup = (formData: object, navigate: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signUp(formData); 
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; 
    }
};