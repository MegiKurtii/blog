import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePosts} from '../../../controllers/posts'

export interface Post {
    _id: string | null;
    title: string;
    selectedFile: string;
    creator: string;
    createdAt: Date;
    tags: string[];
    description: string;
}

interface PostProps {
    post: Post;
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
    const dispatch: any = useDispatch();
    const handleClick = () => {
        setCurrentId(post._id);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200">
            <div className="font-bold text-xl mb-2 text-center">{post.title}</div>
            {post.selectedFile && (
                <img className="w-full h-48 mb-4" src={post.selectedFile} alt="Post" />
            )}
            <p className="text-gray-700 text-base mb-4">{post.description}</p>
            <div className="text-sm text-gray-600 mb-4">
                <span className="mr-2">{post.tags.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800 font-semibold">{post.creator}</span>
                <span className="text-gray-500">{moment(post.createdAt).fromNow()}</span>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => dispatch(deletePosts(post._id))}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
    
export default Post;
