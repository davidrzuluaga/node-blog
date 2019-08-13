import express from 'express';
import { createBlog, getAllBlog } from '../controllers/blog';

const router = express.Router();

router.post('/blog', createBlog);
router.get('/blog', getAllBlog);

export default router;