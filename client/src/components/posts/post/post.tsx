import React from 'react';

export interface Post {
    _id: string;
    selectedFile: any;
    title: string | undefined;
    creator: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
    createdAt: any;
    tags: any[];
    description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
    post:typeof Post;
}
export interface RootState {
    posts: Post[];
    // Other slices of state
}


const Post: React.FC<{ post: Post }> = ({ post }) => {
    return (
        <div className="">
            <div className="" title={post.title} />
            <img src={post.selectedFile} alt="Post" />
            <div>
                <h6>{post.creator}</h6>
                <div>{post.createdAt}</div>
            </div>
            <div>
                <h6>{post.tags}</h6>
            </div>
            <p>{post.description}</p>
        </div>
        
        );

}
export default Post;

