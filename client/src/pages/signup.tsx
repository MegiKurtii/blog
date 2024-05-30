
import React, { useState, FormEvent, ChangeEvent } from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { signup } from '../controllers/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const AuthRegister: React.FC = () => {

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.firstName.trim() === '' ||
            formData.lastName.trim() === '' ||
            formData.email.trim() === '' ||
            formData.password.trim() === '' ||
            formData.confirmPassword.trim() === '') {
            alert('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        dispatch(signup(formData, navigate))
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1/4 p-4 rounded-lg shadow-lg" style={{ backgroundColor: 'aliceblue', marginTop: '8%' }}>
            <h1 className="text-lg text-center py-2">Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    required
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    required
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                    onChange={handleChange}
                />
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        required
                        placeholder="Password"
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
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    required
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="w-1/3 bg-blue-500 text-white py-2 rounded mx-auto block hover:bg-blue-600 mb-6"
                >
                    Register
                </button>
                <div className="text-center">
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AuthRegister;
