import { combineReducers } from 'redux';
import postsReducer from './posts'


const rootReducer = combineReducers({
    posts: postsReducer,
    // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;