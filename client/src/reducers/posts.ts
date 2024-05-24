export default function (posts = [], action: any) {
    switch (action.type) {
        /*  case 'UPDATE':
              return posts.map((post) =>post._id=action.payload._id ? action.payload:post);*/
        case 'FETCH_ALL':
            return { loading: true, error: null };
        case 'CREATE':
            return { posts: action.payload, loading: false };
        default:
            return posts;
    }
};
