import React, { useState, FormEvent, ChangeEvent} from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { signup  } from '../controllers/auth';
import { useNavigate, Link  } from 'react-router-dom';

const AuthRegister: React.FC = () => {


    const dispatch :any= useDispatch();
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
        <div className="absolute left-1/2 -translate-x-1/2"
            style={{ width: '25%', backgroundColor: 'aliceblue', padding: '1%', marginTop: '7%' }}>
            <h1 className="text-lg text-center py-2">Register</h1>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                    name="firstName"
                value={formData.firstName}
                required
                    placeholder="firstName"
                className="w-full border border-gray-300 rounded"
                onChange={handleChange}
                style={{ padding: '1%', marginBottom: '1.5rem' }} />
            <input
                type="text"
                required
                    placeholder="lastName"
                    value={formData.lastName}
                    name="lastName"
                onChange={handleChange}
                className="w-full  border border-gray-300 rounded"
                style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input
                    type="email"
                    required
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    className="w-full border border-gray-300 rounded"
                    onChange={handleChange}
                    style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input
                    type={showPassword ? "text" : "password"}
                    required placeholder="password"
                    name="password"
                    value={formData.password}
                    className="w-full border border-gray-300 rounded"
                    onChange={handleChange}
                    onClick={handleShowPassword}
                    style={{ padding: '1%', marginBottom: '1.5rem' }} />
                    <input
                    type="password"
                    name="confirmPassword"
                        required
                    placeholder="confirm password"
                    value={formData.confirmPassword}
                        className="w-full border border-gray-300 rounded"
                        onChange={handleChange}
                        style={{ padding: '1%', marginBottom: '1.5rem' }} />
                    <button
                        type="submit"
                        className="border border-gray-300"
                    style={{ width: '30%', padding: '1%', marginLeft: '35%', marginBottom: '1.5rem' }}>
                    Register
                </button>
                <div>
                    Don't have an account yet? <Link to="/signin">Sign in</Link>
                </div>
            </form>
        </div>
    );
};

export default AuthRegister;
