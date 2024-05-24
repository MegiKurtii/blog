import React, { useState, ChangeEvent ,FormEvent } from 'react';
import { createPosts } from '../../controllers/posts'
import '../../index.css';
import { useDispatch, useSelector } from 'react-redux';

interface TextFieldProps {
    name: string;
    variant?: 'outlined' | 'filled'; // Optional, defaults to 'filled'
    fullWidth?: boolean; // Optional, defaults to false
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; // New: Placeholder text
}

const TextField: React.FC<TextFieldProps> = ({ name, variant = 'filled', fullWidth = false, value, placeholder, onChange }) => {
    return (
        <div className={`w-full ${fullWidth ? 'md:w-auto' : ''} md:px-4 md:py-4 mb-2`}>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full py-2 px-2 border rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 ${variant === 'outlined'
                    ? 'border-gray-300'
                    : 'bg-gray-100'
                    }`}
            />
        </div>
    );
};



const Form = (currentId: any, setCurrentId: any) => {
   /* const post = useSelector((state) => {
        return currentId ? state.posts.find((p: { _id: any; }) => p._id = currentId) : null;
    });*/ 
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        description: '',
        tags: '',
        selectedFile: File,
    });



    const dispatch: any = useDispatch();

    //actions
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        dispatch(createPosts(postData));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setPostData({ ...postData, selectedFile: File! });
    };

    const handleClear = () => {
        setPostData({
            creator: '',
            title: '',
            description: '',
            tags: '',
            selectedFile: File,
        });
    };




    return (
        <div style={{ width: '30%', backgroundColor: 'aliceblue' }}>
            <form onSubmit={handleSubmit}>
                <h6 className="text-lg text-center py-2">Share your recipe</h6>
                <TextField name="creator" variant="outlined" placeholder="Creator" value={postData.creator} fullWidth onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" placeholder="Title" value={postData.title} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="description" variant="outlined" placeholder="Description" value={postData.description} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, description: e.target.value })} />
                <TextField name="tags" variant="outlined" placeholder="Tags" value={postData.tags} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, tags: e.target.value })} />
                <input type="file" onChange={handleFileChange} className="w-full py-2 px-2 md:px-4 md:py-4"
                />
                <button type="submit"
                    style={{ width: '-webkit-fill-available', backgroundColor: '#3c3cf5', padding: '2%', margin: '2%' }}    >SUBMIT</button>
                <button type="button" onClick={handleClear} className="py-2 px-2 md:px-4 md:py-4 mt-2"
                    style={{ width: '-webkit-fill-available', backgroundColor: '#ff1010', padding: '2%', margin: '2%' }}  >CLEAR</button>
            </form>
        </div>
    );

}

    export default Form;



