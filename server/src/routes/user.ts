import express from 'express';
import { signin, signup, updateUser, deleteUser} from "../controllers/user";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch('/:id',  updateUser);
router.delete('/:id',  deleteUser);

export default router;