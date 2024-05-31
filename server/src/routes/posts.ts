import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostBySearch, getPost} from '../controllers/post';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/search', getPostBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
export default router;