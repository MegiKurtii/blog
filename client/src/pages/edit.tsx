import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../controllers/users';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        oldPassword: '',
        newPassword: ''
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const nameSplit = user.result.name.split(' ');
            setFormData({
                firstName: nameSplit[0],
                lastName: nameSplit[1],
                email: user.result.email,
                oldPassword: '',
                newPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validationErrors: string[] = [];

        if (!formData.oldPassword) {
            validationErrors.push('Old password is required');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (user) {
            dispatch(updateUser(user.result._id, formData));
            navigate('/account');
        }
    };

    return (
        <div className="overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200 relative left-1/2 -translate-x-1/2" style={{ width: '45%', marginTop: '15%', borderRadius: '3%' }}>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <div className="text-red-500">
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <h1 className="text-xl mb-2 text-center" style={{ fontWeight: 'bolder' }}>Edit your account</h1>
                <div className="w-full">Firstname: 
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="text-xl mb-2 sp-2" style={{marginLeft:'1%'}} />
                </div><hr/>
                <div className="w-full">Lastname: 
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="text-xl mb-2 p-2" style={{ marginLeft: '1%' }}  />
                </div><hr />
                <div className="w-full">Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="text-xl mb-2 p-2" style={{ marginLeft: '1%' }}  />
                </div><hr />
                <div className="w-full text-center">
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="font-bold text-xl mb-2 w-full p-2" placeholder="Old Password" />
                </div><hr />
                <div className="w-full text-center">
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="font-bold text-xl mb-2 w-full p-2" placeholder="New Password (Optional)" />
                </div>
                <div className="flex mt-4" style={{ justifyContent: 'space-between' }}>
                    <button type="submit" className="text-white hover:bg-green-700 font-bold py-2 px-4 rounded mr-4" style={{ backgroundColor:'#008000d4' }}>Save</button>
                    <button onClick={() => navigate('/account')} className="text-white hover:bg-gray-700 font-bold py-2 px-4 rounded" style={{ backgroundColor: '#80808096' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditAccount;
