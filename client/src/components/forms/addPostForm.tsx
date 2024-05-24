import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createPosts } from '../../controllers/posts'
import '../../index.css';
import { useDispatch } from 'react-redux';





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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        dispatch(createPosts(postData));
    };

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            // Only set the first selected file
            setFile(event.target.files[0]);
        }
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
                <input type="text" required name="creator" placeholder="Creator" value={postData.creator} style={{ width: '-webkit-fill-available', border: '1px solid #8080804d', padding: '1%', margin: '1%' }} onChange={(e: ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, creator: e.target.value })} />
                <input type="text" required name="title" placeholder="Title" value={postData.title} style={{ width: '-webkit-fill-available', border: '1px solid #8080804d', padding: '1%', margin: '1%' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, title: e.target.value })} />
                <input type="text" required name="description" placeholder="Description" value={postData.description} style={{ width: '-webkit-fill-available', border: '1px solid #8080804d', padding: '1%', margin: '1%' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, description: e.target.value })} />
                <input type="text" required name="tags" placeholder="Tags" value={postData.tags} style={{ width: '-webkit-fill-available', border: '1px solid #8080804d', padding: '1%', margin: '1%' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostData({ ...postData, tags: e.target.value })} />
                <input type="file" onChange={handleFileChange} />
                <button type="submit"
                    style={{ width: '-webkit-fill-available', backgroundColor: '#3c3cf5', padding: '2%', margin: '2%' }}    >SUBMIT</button>
                <button type="button" onClick={handleClear} className="py-2 px-2 md:px-4 md:py-4 mt-2"
                    style={{ width: '-webkit-fill-available', backgroundColor: '#ff1010', padding: '2%', margin: '2%' }}  >CLEAR</button>
            </form>
        </div>
    );

}

export default Form;