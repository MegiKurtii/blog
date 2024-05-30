import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../controllers/posts';
import '../index.css';

interface PaginationProps {
    count: number;
    currentPage: number;
}

const MyPagination: React.FC<PaginationProps> = ({ count, currentPage }) => {

    const dispatch:any = useDispatch();

    const pages = Array.from({ length: count }, (_, i) => i + 1);
    useEffect(() => {
        if (currentPage) dispatch(getPosts());
    }, [currentPage]);

    return (
        <nav className="flex justify-center my-4">
            <ul className="flex">
                {pages.map((page) => (
                    <li key={page}>
                        <Link
                            to={`/posts?page=${page}`}
                            className={`px-3 py-1 mx-1 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                                } hover:bg-blue-600 hover:text-white`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MyPagination;