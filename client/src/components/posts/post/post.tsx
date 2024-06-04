import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePosts } from '../../../controllers/posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV ,faTrash} from '@fortawesome/free-solid-svg-icons';



export interface Post {
    name: string;
    _id: string | null;
    title: string;
    selectedFile: string;
    createdAt: Date;
    creator: string,
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
    const user = JSON.parse(localStorage.getItem('profile') || '{}');

    return (
        <div className="rounded overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200 relative transition duration-300 ease-in-out transform hover:-translate-y-1"
           
        >

            {post.selectedFile && (
                <div className="relative">
                    <img className="w-full h-48 mb-4" style={{ borderRadius: '10px' }} src={post.selectedFile} alt="Post" />
                    <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                    </div>
                </div>
            )}
            <p className="text-gray-700 text-base mb-4" style={{ height: '120px', overflowY: 'scroll' }}>{post.description}</p><hr />
            <div className="text-sm text-gray-600 mb-4">
                {post.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mt-2">{`#${tag}`}</span>
                ))}
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800 font-semibold">{post.name}</span>
                <span className="text-gray-500">{moment(post.createdAt).fromNow()}</span>
            </div>
            {(user?.result?._id === post?.creator) && (
                <div>
                    <button
                        onClick={handleClick}
                        className="absolute text-white  px-2 rounded"
                        style={{ top: '4%', right: '7%', fontSize: 'larger', backgroundColor:'#00000091' }}
                    >
                        <FontAwesomeIcon icon={faEllipsisV} size="sm" />
                    </button>
                    <button
                        onClick={() => dispatch(deletePosts(post._id))}
                        className="absolute bg-red-500 hover:bg-red-600 focus:bg-red-700 text-white font-bold px-2 rounded "
                        style={{ top: '4%', left: '7%' }}
                    >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                    </button>
                </div>
            )}

        </div>
    );
};

export default Post;