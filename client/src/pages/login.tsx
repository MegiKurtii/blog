import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Login: React.FC = () => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ width: '25%', backgroundColor: 'aliceblue', padding: '1%', marginTop: '7%' }}>
            <h1 className="text-lg text-center py-2">Login</h1>
            <form>
                <input type="text" required placeholder='username' className="w-full mb-2 border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <input type="password" required placeholder='password' className="w-full mb-2 border border-gray-300 rounded" style={{ padding: '1%', marginBottom: '1.5rem' }} />
                <button className="w-full mb-2  border border-gray-300" style={{ width: '30%', padding: '1%', marginLeft: '35%', marginBottom: '1.5rem' }}>Login</button>
                <div className="w-full mb-2">Don't have an account yet?</div>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}
export default Login;