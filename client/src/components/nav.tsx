import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actionType from '../constants/actionTypes';

const Nav: React.FC = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const dispatch:any = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('profile');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser); 
            setUser(parsedUser);
        } else {
            setUser(null);
        }
    }, [location]);


    return (
        <nav className="absolute z-10 bg-white text-center left-1/2 -translate-x-1/2" style={{ width: '45%', padding: '1%', boxShadow: '-4px 7px 7px gray', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', top: '0' }}>
            <Link to="/" style={{ padding: '3%', marginRight: '4%' }}>Home</Link>
            <Link to="/about" style={{ padding: '3%', marginRight: '4%' }}>About</Link>
            <span>
                {user ? (
                    <span>{user?.result.name}
                        <Link to="/account" style={{ padding: '3%', marginRight: '4%' }}>...</Link>
                        <button onClick={logout} style={{ padding: '3%' }}>Logout</button>
                        </span>
                ) : (
                    <Link to="/signin" style={{ padding: '3%', marginRight: '4%' }}>Log In</Link>
                )}
            </span>
        </nav>
    );
};

export default Nav;
