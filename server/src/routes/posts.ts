import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostBySearch} from '../controllers/post';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/search', getPostBySearch);
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
export default router;