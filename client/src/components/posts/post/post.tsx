import React from 'react';
import moment from 'moment';
export interface Post {
    _id: string;
    selectedFile: string;
    title: string | undefined;
    creator: string | React.ReactNode;
    createdAt: string;
    tags: string[];
    description: string | React.ReactNode;
}
export interface RootState {
    posts: Post[];
    // Other slices of state
}


const Post: React.FC<{ post: Post }> = ({ post }) => {
    return (
        <div className="post">
            <div className="post-title" title={post.title}>
                {post.title}
            </div>
            <img src={post.selectedFile} alt="Post" />
            <div>
                <h6>{post.creator}</h6>
                <div>{moment(post.createdAt).fromNow()}</div>
            </div>
            <div>
                <h6>{post.tags.join(', ')}</h6>
            </div>
            <p>{post.description}</p>
        </div>
    );
};

export default Post;

