import React, { useEffect} from 'react';
import MainRoutes from './routes/routes';
import './index.css';
import { useDispatch } from 'react-redux';
import { getPosts } from './controllers/posts';
import { AppDispatch } from './index'; 
import { useState } from 'react';

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
            <MainRoutes />
        </div>
    );
}
export default App;