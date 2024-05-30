import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actionType from '../constants/actionTypes';
import { getPostBySearch } from '../controllers/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Nav: React.FC = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const dispatch:any = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const query = useQuery();
    const SearchQuery = query.get('searchQuery');

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

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchPost();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav className="absolute z-10 bg-white text-center left-1/2 -translate-x-1/2" style={{ width: '45%', padding: '1%', boxShadow: '-4px 7px 7px gray', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', top: '0' }}>
            <Link to="/" style={{ padding: '3%', marginRight: '4%' }}>Home</Link>
            <Link to="/about" style={{ padding: '3%', marginRight: '4%' }}>About</Link>
            <span>
                {user ? (
                        <span>{`${user.lastName} ${user.firstName}`}
                        <button onClick={logout} style={{ padding: '3%' }}>Logout</button>
                        </span>
                ) : (
                    <Link to="/signin" style={{ padding: '3%', marginRight: '4%' }}>Log In</Link>
                )}
            </span>
            <input
                type="search"
                name="search"
                placeholder="Search"
                onKeyPress={handleKeyPress}
                value={search}
                onChange={handleChange}
                style={{ padding: '1%', width: '150px', marginLeft: '4%' }}
            />
        </nav>
    );
};

export default Nav;
