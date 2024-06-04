import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actionType from '../constants/actionTypes';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav: React.FC = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [navStyle, setNavStyle] = useState({});
    const dispatch = useDispatch();
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

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // Small screens
                setNavStyle({
                    width: '90%',
                    padding: '2%',
                    left: '5%',
                    transform: 'translateX(0)',
                });
            } else if (width < 1024) {
                // Medium screens
                setNavStyle({
                    width: '60%',
                    padding: '1.5%',
                    left: '20%',
                    transform: 'translateX(0)',
                });
            } else {
                // Large screens
                setNavStyle({
                    width: '45%',
                    padding: '1%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                });
            }
        };

        // Initial style set
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="absolute z-10 bg-white text-center" style={{ ...navStyle, boxShadow: '-4px 7px 7px gray', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',top:'0'}}>
            <span style={{ padding: '3%', marginRight: '3%', fontFamily: 'cursive' }}>
                <span style={{ fontSize: 'larger' }}> VeggieVibes </span>
            </span>
            <Link to="/" style={{ padding: '3%', marginRight: '4%' }}>Home</Link>
            <Link to="/about" style={{ padding: '3%', marginRight: '4%' }}>About</Link>
            <span>
                {user ? (
                    <span>
                        {user?.result.name}
                        <Link to="/account" style={{ padding: '3%', marginRight: '4%' }}>
                            <FontAwesomeIcon icon={faEllipsisV} size="sm" />
                        </Link>
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
