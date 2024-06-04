import * as actionType from '../constants/actionTypes';

interface AuthState {
    authData: any; 
    loading: boolean;
    errors: any;
}

interface AuthAction {
    type: string;
    data?: any; 
}

const initialState: AuthState = {
    authData: null,
    loading: false,
    errors: null
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        case actionType.UPDATE_USER:
            if (state.authData) {
                const updatedProfile = { ...state.authData, result: action.data };
                localStorage.setItem('profile', JSON.stringify(updatedProfile));
                return { ...state, authData: updatedProfile, loading: false, errors: null };
            }
            return state;
        case actionType.DELETE_USER:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;