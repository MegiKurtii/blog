
import { Link } from 'react-router-dom';
import '../index.css';

import React from 'react';


const Nav: React.FC = ({ }) => {
    return (
        <nav className="absolute z-10 bg-white text-center left-1/2 -translate-x-1/2" style={{ width: '45%', padding: '1%', boxShadow: '-4px 7px 7px gray', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
            <Link to="/" style={{ padding: '3%', marginRight: '7%' }}>Home</Link>
            <Link to="/about" style={{ padding: '3%', marginRight: '7%' }}>About</Link>
            <Link to="/login" style={{ padding: '3%', marginRight: '7%' }}>Login</Link>
            <Link to="/" style={{ padding: '3%', marginRight: '7%' }}>Search</Link>
        </nav>

    )
}
export default Nav;
/*    box-shadow: -4px 7px 7px gray
  border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
 */