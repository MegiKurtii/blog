import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { createPosts, updatePosts } from '../../controllers/posts';
import '../../index.css';
import { useDispatch, useSelector } from 'react-redux';


interface FormProps {
    currentId: string | null;
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}
interface IPost {
    creator: string;
    title: string;
    description: string;
    tags: string[];
    selectedFile: string;
}

const predefinedTags = ["Healthy", "Vegan", "Gluten-Free", "Dessert", "Spicy", "Quick"];

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState<IPost>({
        creator: '',
        title: '',
        description: '',
        tags: [],
        selectedFile: '',
    });

    const post = useSelector((state: any) => currentId ? state.posts.find((p: { _id: string; }) => p._id === currentId) : null);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const dispatch: any = useDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (currentId) {
            dispatch(updatePosts(currentId, postData));
        } else {
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
            tags: [],
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

    const handleTagAdd = (tag: string) => {
        if (!postData.tags.includes(tag)) {
            setPostData({ ...postData, tags: [...postData.tags, tag] });
        }
    };

    const handleTagRemove = (tag: string) => {
        setPostData({ ...postData, tags: postData.tags.filter(t => t !== tag) });
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" style={{ width: '80%', marginLeft: '7%'}}>
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
                <div className="mb-4">
                    <h6 className="mb-2">Tags</h6>
                    <div className="flex flex-wrap">
                        {predefinedTags.map(tag => (
                            <div key={tag} className="bg-blue-100 rounded-full px-3 py-1 m-1 flex items-center">
                                <span className="mr-1">{tag}</span>
                                <button type="button" onClick={() => handleTagAdd(tag)} className="text-blue-500 hover:text-blue-800 focus:outline-none">
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4 flex items-center flex-wrap">
                    {postData.tags.map(tag => (
                        <div key={tag} className="bg-blue-100 rounded-full py-1 m-1 flex items-center" style={{ width: '35%', justifyContent: 'space-around' }}>
                            <span className="mr-1">{tag}</span>
                            <button type="button" onClick={() => handleTagRemove(tag)} className="text-blue-500 hover:text-blue-800 focus:outline-none">
                                x
                            </button>
                        </div>
                    ))}
                </div>
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
