import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../controllers/posts';
import '../index.css';

interface PaginationProps {
    currentPage: any;
    totalPages: any;
    url: any;
}

const MyPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, url }) => {

    const numberOfPages = [];
    for (let i = 1; i <= totalPages; i++) {
        numberOfPages.push(i);
    }
    const dispatch :any = useDispatch();


    useEffect(() => {
        if (currentPage) {
            dispatch(getPosts(currentPage));
        }
    }, [dispatch, currentPage]);
    return (
        <nav>
            <ul className='pagination'>
                {numberOfPages.map(number => (
                    <li key={number} className='page-item'>
                        <Link to={`${url}?page=${number}`} className={number === currentPage ? 'page-link active' : 'page-link'}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MyPagination;