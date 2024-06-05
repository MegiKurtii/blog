import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { getPosts } from '../controllers/posts';

interface PaginationProps {
    page: any;
    totalPages: any;
}

const MyPagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
    const { page: currentPage } = useParams<{ page: string }>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pageNumber = currentPage ? parseInt(currentPage, 10) : 1;
        dispatch(getPosts(pageNumber));
    }, [dispatch, currentPage]);

    return (
        <div style={{ marginTop: '3%', textAlign: 'center', marginBottom: '3%' }}>
            {[...Array(totalPages)].map((_, index) => (
                <Link style={{ paddingLeft: '1%', border: '1px solid gray', margin: '1%', paddingRight: '1%', borderRadius: '25%', backgroundColor:'#3b8eae',color:'white' }} key={index} to={`/?page=${index + 1}`}>
                     {index + 1}
                </Link>
            ))}
        </div>
    );
};

export default MyPagination;
