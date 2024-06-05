import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.css';
import Post from './post/post';
import { Post as PostType } from './post/post';

interface RootState {
    posts: {
        isLoading: boolean;
        posts: PostType[];
    };
}

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    );
};

interface PostsProps {
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Posts: React.FC<PostsProps> = ({ setCurrentId }) => {
    const { isLoading, posts } = useSelector((state: RootState) => state.posts);

    // If posts is undefined or null, return null or render a loading spinner
    if (!posts) {
        if (isLoading) return <LoadingSpinner />;
        return null;
    }

    return (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 45%)', paddingLeft: '5%' }}>
            {posts.map((post) => (
                <div key={post._id} className="grid-item">
                    <Post post={post} setCurrentId={setCurrentId} />
                </div>
            ))}
        </div>
    );
};

export default Posts;