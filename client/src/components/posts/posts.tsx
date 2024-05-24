import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.css';
import Post, { Post as PostType } from './post/post';

export interface RootState {
    posts: PostType[];
    // Other slices of state
}

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    );
};

const Posts: React.FC = () => {
    const posts = useSelector((state: RootState) => state.posts);

    return (
        !posts.length ? <LoadingSpinner /> : (
            <div className="grid align-items-stretch spacing-13">
                {posts.map((post) => (
                    <div key={post._id} className="grid-item">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        )
    );
};

export default Posts;