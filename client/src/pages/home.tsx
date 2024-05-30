import React, { useState } from 'react';
import '../index.css'; // Import your styles
import Posts from '../components/posts/posts';
import Form from '../components/forms/addPostForm';
import MyPagination from '../components/pagination';


const Home: React.FC = () => {

    const [currentId, setCurrentId] = useState<string | null>(null);
    const totalCount = 10; 
    const currentPage = 1; 

    return (
        <div>
            <div className="flex">
                <Posts setCurrentId={setCurrentId} />
                <div>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
               
                    <MyPagination count={totalCount} currentPage={currentPage}/>
               </div>
            </div>
        </div>
    );
}
export default Home;

