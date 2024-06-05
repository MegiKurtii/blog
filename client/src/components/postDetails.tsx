import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostBySearch} from '../controllers/posts';
import { RootState } from '../reducers/posts';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import CommentSection from './comments';

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const navigate = useNavigate();

    const { post, posts, isLoading } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(getPost(id));
        }
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({ searchQuery: 'none', tags: post?.tags.join(','),creator:'none',description:'none' }));
        }
    }, [post]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }
    const openPost = (_id: any) =>navigate(`/posts/${_id}`);

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);


   

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg" style={{ margin: '2%', marginTop: '10%', padding: '6%' }}>
            <div>
                <h1 className="text-2xl text-center font-bold mb-4" style={{ fontFamily: 'cursive' }}>{post.title}</h1>
                <div className="flex" style={{ justifyContent: 'space-between' }}>
                    <div>
                        <h6 className="font-bold mb-2">Tags:</h6>
                        <p className=" border-b border-gray-200 pb-4">{post.tags.join(', ')}</p>
                    </div>
                    <div>
                        <h6 className="font-bold">Created by: {post.name}</h6>
                        <div>{moment(post.createdAt).fromNow()}</div>
                    </div>
                </div>
                <div style={{ marginBottom: '10%', gap: '5%' }}>
                    <div>

                        <img src={post.selectedFile} alt="recommended post" className="rounded-lg" style={{ height: '350px', width: '45%', float: 'right', padding: '2%', borderRadius: '10%' }} />

                        <div className="font-bold mb-2">Description:</div>

                        <p className=" border-b border-gray-200 pb-4" style={{}}>{post.description}</p>

                    </div>
                </div>
            </div>
               
                <CommentSection post={post} />
            
            {recommendedPosts.length > 0 && (
                <div style={{marginTop:'15%'}}>
                    <h1 className="text-xl font-bold mb-4 text-center">You might also like:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendedPosts.map(({ _id, title, name, description, selectedFile }) => (
                            <div
                                key={_id}
                                onClick={() => openPost(_id)}
                                className="cursor-pointer rounded-lg border border-gray-200 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                            >
                                <img src={selectedFile} alt="recommended post" className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold  mb-2" style={{ fontFamily: 'cursive' }}>{title}</h2>
                                    <h3 className="text-sm font-bold text-gray-600 mb-2" style={{fontFamily:'math'}}>{name}</h3>
                                    <p className="text-sm text-gray-800" style={{ height: '120px', overflowY: 'hidden' }}>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;