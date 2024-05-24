import React from 'react';

import { useSelector } from 'react-redux';
import '../../index.css';
import Post, { RootState }  from './post/post';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    );
};

const initialState: RootState = {
    posts: [],
    // Other initial state properties
};


const Posts = () => {
    const posts = useSelector((state:RootState) => state.posts);
 
    return (
        !posts.length ? <LoadingSpinner /> : (
            <div className=" align-items:strech spacing:13">
                {posts.map((post) => (
                    <div key={post._id} className="grid-item">
                        <Post post={post}/>
                        </div>
                ))}
              
            </div>
            )
    );
}

export default Posts;