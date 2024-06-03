
import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export interface Post {
    _id: string;
    title: string;
    name: string;
}

export interface Action {
    type: string;
    payload: any;
}

interface PostsState {
    isLoading: boolean;
    posts: Post[];
    currentPage?: number;
    numberOfPages?: number;
}

const initialState: PostsState = {
    isLoading: true,
    posts: [],
};

const postsReducer = (state: PostsState = initialState, action: Action): PostsState => {
    switch (action.type) {
        case START_LOADING:
            return { isLoading: true, posts: state.posts };
        case END_LOADING:
            return { isLoading: false, posts: state.posts };
        case FETCH_BY_SEARCH:
            return { isLoading: false, posts: action.payload.data };
        case FETCH_ALL:
            return {
                isLoading: false,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,};
        case CREATE:
            return { isLoading: state.isLoading, posts: [...state.posts, action.payload] };
        case UPDATE:
            return {
                isLoading: state.isLoading,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            return {
                isLoading: state.isLoading,
                posts: state.posts.filter((post) => post._id !== action.payload),
            };
        default:
            return state;
    }
};

export default postsReducer;