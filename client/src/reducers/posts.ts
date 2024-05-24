import { AnyAction } from 'redux';
interface PostsState {
    loading: boolean;
    error: string | null;
    posts: any[];
}

const initialState: PostsState = {
    loading: false,
    error: null,
    posts: [],
};

const postsReducer = (state = initialState, action: AnyAction): PostsState => {
    switch (action.type) {
        /*  case 'UPDATE':
              return posts.map((post) =>post._id=action.payload._id ? action.payload:post);*/
        case 'FETCH_ALL':
            return { ...state, loading: true, error: null };
        case 'CREATE':
            return { ...state,  posts: action.payload, loading: false };
        default:
            return state;
    }
};
export default postsReducer;