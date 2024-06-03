import React, { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import Posts from '../components/posts/posts';
import Form from '../components/forms/addPostForm';
import MyPagination from '../components/pagination';
import { useDispatch } from 'react-redux';
import { getPostBySearch } from '../controllers/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home: React.FC = () => {
    const query = useQuery();
    const [currentId, setCurrentId] = useState<string | null>(null);
    const searchQuery = query.get('searchQuery');
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const page = query.get('page') || 1;


    const searchPost = () => {
        const searchCriteria = {
            search,
            tags: tags.join(','),
            name,
            description
        };
        dispatch(getPostBySearch(searchCriteria));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}&creator=${name || 'none'}&description=${description || 'none'}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCreatorSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(','));
    };

    return (
        <div>
            <div className="flex">
                <Posts setCurrentId={setCurrentId} />
                <div>
                    <form className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" style={{ width: '80%', marginLeft: '7%' }}>
                        <input
                            type="text"
                            name="search"
                            value={search}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Search by title"
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyPress}
                        /><br />
                        <input
                            type="text"
                            name="search"
                            value={name}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Search by creator"
                            onChange={handleCreatorSearchChange}
                            onKeyDown={handleKeyPress}
                        /><br />
                        <input
                            type="text"
                            name="search"
                            value={description}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Search by description"
                            onChange={handleDescriptionSearchChange}
                            onKeyDown={handleKeyPress}
                        /><br />
                        <input
                            type="text"
                            value={tags.join(',')}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Search by tags"
                            onChange={handleTagsChange}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            type="button"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            onClick={searchPost}
                        >
                            Search
                        </button>
                    </form>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    {(!searchQuery && tags.length === 0) && (
                        <MyPagination currentPage={page} totalPages url/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
