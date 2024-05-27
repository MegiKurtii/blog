import { combineReducers } from 'redux';
import postsReducer from './posts';
import authReducer from './auth';

const rootReducer = combineReducers({
    posts: postsReducer, // Reducer for the posts slice of state
    authData: authReducer, // Reducer for the authData slice of state
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;