import React, { useState, FormEvent, ChangeEvent } from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { signin } from '../controllers/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const Auth: React.FC = () => {


    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signin(formData, navigate))
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);


    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1/4 p-4 mt-7 rounded-lg shadow-lg" style={{ backgroundColor: 'aliceblue', marginTop: '10%' }}>
            <h1 className="text-lg text-center py-2">Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                    onChange={handleChange}
                />
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        className="w-full border border-gray-300 rounded p-2 mb-6"
                        onChange={handleChange}
                    />
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={handleShowPassword}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </span>
                </div>
                  
                <button
                    type="submit"
                    className="w-1/3 bg-blue-500 text-white py-2 rounded mx-auto block hover:bg-blue-600"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    <Link to="/auth" className="text-blue-500 hover:underline">
                        Don't have an account yet? Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Auth;