import React, { useState } from 'react';
import '../index.css'; // Import your styles
import Posts from '../components/posts/posts';
import Form from '../components/forms/addPostForm';

const Home: React.FC = () => {
    
    const [currentId, setCurrentId] = useState<string | null>(null);


    return (
        <div>
            <div>
                <Posts setCurrentId={setCurrentId}/>
            </div>
            <div>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
        </div>
    );
}
export default Home;

