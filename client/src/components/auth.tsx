import React, { useState, FormEvent, ChangeEvent} from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { signin, signup  } from '../controllers/auth';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegister) {
            dispatch(signup(formData, navigate))
        }
        else {
            dispatch(signin(formData, navigate))
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsRegister((prevIsRegister) => !prevIsRegister);
    }
    return (
        <div className="absolute left-1/2 -translate-x-1/2"
            style={{ width: '25%', backgroundColor: 'aliceblue', padding: '1%', marginTop: '7%' }}>
            <h1 className="text-lg text-center py-2">{isRegister ? 'Register' : 'Log In'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {
                        isRegister && (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    required
                                    placeholder="name"
                                    className="w-full border border-gray-300 rounded"
                                    onChange={handleChange}
                                    style={{ padding: '1%', marginBottom: '1.5rem' }} />
                                <input
                                    type="text"
                                    required
                                    placeholder="lastname"
                                    value={formData.lastname}
                                    name="lastname"
                                    onChange={handleChange}
                                    className="w-full  border border-gray-300 rounded"
                                    style={{ padding: '1%', marginBottom: '1.5rem' }} />

                            </>
                            )
                    }
                </div>
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
                {isRegister &&
                    <input
                    type="password"
                    name="confirmPassword"
                        required
                    placeholder="confirm password"
                    value={formData.confirmPassword}
                        className="w-full border border-gray-300 rounded"
                        onChange={handleChange}
                        style={{ padding: '1%', marginBottom: '1.5rem' }} />
                }
                    <button
                        type="submit"
                        className="border border-gray-300"
                    style={{ width: '30%', padding: '1%', marginLeft: '35%', marginBottom: '1.5rem' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
                <div>
                    <button onClick={switchMode}>
                        {isRegister ? 'Already have an account? Log In' :
                            "Don't have an account yet? Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
