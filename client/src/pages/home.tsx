import React from 'react';
import '../index.css'; // Import your styles
import Posts from '../components/posts/posts';
import Form from '../components/forms/addPostForm';
const Home: React.FC = () => {
    const currentId = null;
    const setCurrentId = () => { };
    return (
        <div>
            <div className="grid">
                <Posts />
            </div>
            <div className="grid">
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
        </div>
    );
}
export default Home;

