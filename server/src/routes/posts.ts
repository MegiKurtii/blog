import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostsBySearch, getPost, commentPost} from '../controllers/post';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/commentPost', auth, commentPost);
export default router;