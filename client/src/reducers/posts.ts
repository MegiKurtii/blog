import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, COMMENT, FETCH_POST } from '../constants/actionTypes';

export interface Post {
    name: string;
    _id: string;
    title: string;
    selectedFile: string;
    createdAt: Date;
    creator: string,
    tags: string[];
    description: string;
    comments: string[];
}

export interface Action {
    type: string;
    payload: any;
}

const initialState = {
    isLoading: true,
    posts: [],
    currentPage: 1,
    totalPages: 1,
};

export interface PostsState {
    isLoading: boolean;
    posts: Post[];
    post?: Post | null;
    currentPage?: number;
    totalPages?: number;
}
export interface RootState {
    posts: PostsState;
}
const postsReducer = (state: PostsState = initialState, action: Action): PostsState => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};

export default postsReducer;
