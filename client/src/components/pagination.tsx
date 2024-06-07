import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPosts } from '../controllers/posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
    page: any;
    totalPages: any;
}

const MyPagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
    const { page: currentPageParam } = useParams<{ page: string }>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const pageNumber = currentPageParam ? parseInt(currentPageParam, 10) : page;

    useEffect(() => {
        dispatch(getPosts(pageNumber));
    }, [dispatch, pageNumber]);

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            navigate(`/?page=${pageNumber - 1}`);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < totalPages) {
            navigate(`/?page=${pageNumber + 1}`);
        }
    };

    const renderPageNumbers = () => {
        let startPage = Math.max(1, pageNumber - 1);
        let endPage = Math.min(totalPages, startPage + 2);

        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 2);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div style={{ marginTop: '3%', textAlign: 'center', marginBottom: '3%' }}>
            <button
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {renderPageNumbers().map((num) => (
                <Link
                    key={num}
                    to={`/?page=${num}`}
                    style={{
                        paddingLeft: '1%',
                        paddingRight: '1%',
                        margin: '1%',
                        border: '1px solid gray',
                        borderRadius: '25%',
                        backgroundColor: num === pageNumber ? '#1b5e78' : '#3b8eae',
                        color: 'white'
                    }}
                >
                    {num}
                </Link>
            ))}
            <button
                onClick={handleNextPage}
                disabled={pageNumber === totalPages}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default MyPagination;
