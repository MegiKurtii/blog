import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteProfile } from '../controllers/users';
import { updateProfile } from '../controllers/users';

/*export interface User {
    firstName: string;
    lastName: string;
    email: string;
}
interface UserProps {
    user: User;
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}*/
const Account = () => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');

    return (
        <div className="rounded overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200 relative transition duration-300 ease-in-out transform hover:-translate-y-1"
            style={{ width: '50%' ,marginTop:'20%'}}
        >

            <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                <div className="font-bold text-xl mb-2">{profile.firstName}</div>
            </div>
            <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                <div className="font-bold text-xl mb-2">{profile.lastName}</div>
            </div>
            <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                <div className="font-bold text-xl mb-2">{profile.email}</div>
            </div>
            <div className="absolute top-0 left-0 w-full text-center" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)', color: 'white', textShadow: '1px 2px black' }}>
                <div className="font-bold text-xl mb-2">{profile.password}</div>
            </div>
        
        
            {(profile?.result?._id === profile?.creator) && (
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 focus:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Delete
                    </button>
                </div>
            )}

        </div>
    );
};

export default Account;
