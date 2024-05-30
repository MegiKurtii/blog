import { FETCH_BY_SEARCH,FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import { Post } from '../components/posts/post/post';

const postsReducer = (posts: Post[] = [], action: any) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case FETCH_BY_SEARCH:
            return {
                posts: action.payload,
            }
        default:
            return posts;
    }
};

export default postsReducer;




