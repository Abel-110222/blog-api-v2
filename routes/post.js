import express from 'express';
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/:postId', getPost);
router.get('/', getAllPosts);

export default router;
