import express from "express";
import { getPost, addPost, updatePost, deletePost, getPostById } from '../controller/post.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPost);
router.get('/:id', getPostById);
router.post('/', auth, addPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;