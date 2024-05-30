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
        <div className="rounded overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200 relative transition duration-300 ease-in-out transform hover:-translate-y-1"
            style={{ width: '85%'}}
        >

            {post.selectedFile && (
                <div className="relative">
                    <img className="w-full h-48 mb-4" style={{ borderRadius: '10px' }} src={post.selectedFile} alt="Post" />
                    <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                    </div>
                </div>
            )}
            <p className="text-gray-700 text-base mb-4">{post.description}</p><hr/>
            <div className="text-sm text-gray-600 mb-4">
                {post.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mt-2">{`#${tag}`}</span>
                ))}
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800 font-semibold">{post.creator}</span>
                <span className="text-gray-500">{moment(post.createdAt).fromNow()}</span>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Edit
                </button>
                <button
                    onClick={() => dispatch(deletePosts(post._id))}
                    className="bg-red-500 hover:bg-red-600 focus:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
    
export default Post;
