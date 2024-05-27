import React, { useState, FormEvent, ChangeEvent } from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { signin } from '../controllers/auth';
import { useNavigate, Link } from 'react-router-dom';

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
        <div className="absolute left-1/2 -translate-x-1/2"
            style={{ width: '25%', backgroundColor: 'aliceblue', padding: '1%', marginTop: '7%' }}>
            <h1 className="text-lg text-center py-2">Log In</h1>
            <form onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    className="border border-gray-300"
                    style={{ width: '30%', padding: '1%', marginLeft: '35%', marginBottom: '1.5rem' }}>
                    Login
                </button>
                <div>
                    <div>
                        <Link to="/auth">Don't have an account?Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Auth;
