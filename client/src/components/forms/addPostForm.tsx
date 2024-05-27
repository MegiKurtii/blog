import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { createPosts, updatePosts } from '../../controllers/posts'
import '../../index.css';
import { useDispatch, useSelector } from 'react-redux';




interface FormProps {
    currentId: string | null;
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
    /* const post = useSelector((state) => {
         return currentId ? state.posts.find((p: { _id: any; }) => p._id = currentId) : null;
     });*/
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        description: '',
        tags: '',
        selectedFile: '',
    });

    const post = useSelector((state:any) => currentId ? state.posts.find((p: { _id: string; }) => p._id === currentId): null)
    useEffect(() => {
        if (post) setPostData(post);
    },[post])

    const dispatch: any = useDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (currentId) {
            dispatch(updatePosts(currentId, postData));
        }
        else {
            dispatch(createPosts(postData));
        }
        handleClear();
    };


    const handleClear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            description: '',
            tags: '',
            selectedFile: '',
        });
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostData({ ...postData, selectedFile: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" style={{width:'35%'}}>
            <form onSubmit={handleSubmit}>
                <h6 className="text-lg text-center py-2">{currentId ? 'Edit' : 'Share'} your recipe</h6>
                <input
                    type="text"
                    required
                    name="creator"
                    placeholder="Creator"
                    value={postData.creator}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, creator: e.target.value })}
                />
                <input
                    type="text"
                    required
                    name="title"
                    placeholder="Title"
                    value={postData.title}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, title: e.target.value })}
                />
                <input
                    type="text"
                    required
                    name="description"
                    placeholder="Description"
                    value={postData.description}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, description: e.target.value })}
                />
                <input
                    type="text"
                    required
                    name="tags"
                    placeholder="Tags"
                    value={postData.tags}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, tags: e.target.value })}
                />
                <input
                    type="file"
                     required
                    multiple={false}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    onChange={handleFileChange}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    SUBMIT
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    CLEAR
                </button>
            </form>
        </div>
    );
};
   

export default Form;