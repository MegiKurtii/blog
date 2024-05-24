import React from 'react';
import { Link } from 'react-router-dom';

import '../index.css';
const Register: React.FC = () => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ width: '25%', backgroundColor: 'aliceblue', padding: '1%', marginTop: '7%' }}>
            <h1 className="text-lg text-center py-2">Register</h1>
            <form>
                <input type="text" required placeholder="name" className="w-full  border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input type="text" required placeholder="username" className="w-full  border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input type="email" required placeholder="email" className="w-full  border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input type="password" required placeholder="password" className="w-full border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input type="password" required placeholder="confirm password" className="w-full border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <button type="submit" className="border border-gray-300" style={{ width: '30%', padding: '1%', marginLeft: '35%', marginBottom: '1.5rem' }}>Register</button>
                <div className="w-full p-2">This is an error!Do you have an account?</div>
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
};

export default Register;
