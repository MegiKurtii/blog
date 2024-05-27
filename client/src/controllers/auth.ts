
import { AUTH} from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData: object, router: any) => async (dispatch: any) => {
    try {
        const data = await api.signIn(formData);
        
        dispatch({ type: AUTH, data });
        router.push('/');
    }
    catch (error) {
        console.log(error);
    }
}

export const signup = (formData: object, router: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signUp(formData); 
        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; 
    }
};