import React, { useState, useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { commentPost } from '../controllers/posts';

interface Post {
    _id: string;
    comments: string[];
}

interface CommentSectionProps {
    post: Post;
}

const CommentSection: FC<CommentSectionProps> = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile') || 'null');
    const [comment, setComment] = useState('');
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
    const [comments, setComments] = useState<string[]>(post?.comments || []);
    const commentsRef = useRef<HTMLDivElement>(null);

    const handleComment = async () => {
        if (!user) return; // Safety check to ensure user is present

        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);

        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleComment();
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <h6 className="text-lg font-bold">Comments</h6>
                {comments?.map((c, i) => (
                    <div key={i} className="mb-2">
                        <strong>{c.split(': ')[0]}:</strong>
                        <span className="ml-1">{c.split(': ')[1]}</span>
                    </div>
                ))}
                <div ref={commentsRef} />
            </div>
            <div className="w-full md:w-2/3">
                <h6 className="text-lg font-bold mb-2">Write a comment</h6>
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    rows={4}
                    placeholder={user ? "Comment" : "Please log in to comment."}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={!user}
                    style={{ maxHeight: '200px' }}
                />
                {user && (
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
                        disabled={!comment.length}
                        onClick={handleComment}
                    >
                        Comment
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
