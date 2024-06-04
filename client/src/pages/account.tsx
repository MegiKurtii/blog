import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../controllers/users';
import { useLocation, useNavigate } from 'react-router-dom';

const Account = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('profile');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            setUser(null);
        }
    }, [location]);

    const handleEdit = () => {
        navigate('/edit');
    };

    const handleDelete = () => {
        dispatch(deleteUser(user.result._id));
        localStorage.removeItem('profile');
        navigate('/login');
    };

    return (
        <div className="overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200 relative left-1/2 -translate-x-1/2" style={{ width: '40%', marginTop: '15%', borderRadius:'3%' }}>
            <div className="w-full ">
                <div className="text-xl mb-2" style={{marginBottom:'3%'}}>Username: {user?.result.name}</div>
            </div><hr/>
            <div className="w-full ">
                <div className="text-xl mb-2" style={{ marginTop: '3%', marginBottom: '3%' }}>Email: {user?.result.email}</div>
            </div><hr />
            <div className="flex mt-4" style={{ justifyContent:'space-between' }}>
                <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Edit</button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    );
};

export default Account;
